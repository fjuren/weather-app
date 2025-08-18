import { WEATHER_API } from '@/utils/constants';
import { WeatherAPIError } from '@/utils/helpers';
import {
  CurrentWeatherFreeResponse,
  WeatherLocationType,
} from '@/types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherAPI = {
  // not handling an empty string since this API handles onChange behaviour rather than onSumbit form behaviour
  getCurrentCitySearch: async (
    location: string
  ): Promise<WeatherLocationType[]> => {
    const cleanLocation = location.trim().toLowerCase();

    // limit api calls; requires min 4 letters
    // return empty array if no entered location search data
    if (cleanLocation.length < WEATHER_API.API_QUERY_MIN) {
      return [];
    }

    // look for queried city and return available results from api
    try {
      // construct url query
      const url = new URL(WEATHER_API.GEO_BASE_URL);
      url.searchParams.set('q', encodeURIComponent(cleanLocation));
      url.searchParams.set('limit', WEATHER_API.DEFAULT_LIMIT.toString());
      url.searchParams.set('appid', API_KEY);

      const response = await fetch(url);

      if (!response.ok) {
        throw new WeatherAPIError(
          'Api request failed',
          response.status.toString(),
          response.status
        );
      }

      const rawData = await response.json();

      // validating returned data
      if (!Array.isArray(rawData)) {
        throw new WeatherAPIError('Invalid API format', 'INVALID_RESPONSE');
      }

      return rawData.map((locations) => locations as WeatherLocationType);
    } catch (err) {
      if (err instanceof WeatherAPIError) {
        throw err;
      }

      // For network errors, fetch errors, etc.
      throw new WeatherAPIError('HTTP request failed', 'NETWORK_ERROR');
    }
  },
  getCurrentWeather: async (
    lat: number,
    lon: number
  ): Promise<CurrentWeatherFreeResponse> => {
    try {
      const url = new URL(WEATHER_API.FREE_BASE_URL);
      url.searchParams.set('lat', lat.toString());
      url.searchParams.set('lon', lon.toString());
      url.searchParams.set('appid', API_KEY);
      // url.searchParams.set('exclude', ''); // to exclude certain params; see docs: https://openweathermap.org/api/one-call-3#current
      url.searchParams.set('units', 'metric'); // to set units
      url.searchParams.set('lang', ''); // to set language

      const response = await fetch(url);

      if (!response.ok) {
        throw new WeatherAPIError(
          'Api request failed',
          response.status.toString(),
          response.status
        );
      }

      const rawData = await response.json();

      // validating returned data
      if (typeof rawData !== 'object' || rawData === null) {
        throw new WeatherAPIError('Invalid API format', 'INVALID_RESPONSE');
      }

      return rawData as CurrentWeatherFreeResponse;
    } catch (err) {
      if (err instanceof WeatherAPIError) {
        throw err;
      }

      // For network errors, fetch errors, etc.
      throw new WeatherAPIError('HTTP request failed', 'NETWORK_ERROR');
    }
  },

  getForecast: async (location: string) => {
    // TODO: Implement 5-day forecast API call
    // Endpoint: /forecast?q={location}&appid={API_KEY}&units=metric
  },

  getWeatherByCoords: async (lat: number, lon: number) => {
    // TODO: Implement weather by coordinates
    // Useful for geolocation feature
  },
};
