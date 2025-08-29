import { WEATHER_API } from '@/utils/constants';
import { WeatherAPIError } from '@/utils/helpers';
import { WeatherLocationType } from '@/types/weather';
import { CurrentWeatherFreeResponse } from '@/types/currentWeather';
import { ForecastWeatherResponse } from '@/types/forecastWeather';

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
    lon: number,
    units: string = 'metric'
  ): Promise<CurrentWeatherFreeResponse> => {
    try {
      // two separate api calls due to use of free version
      // Current weather
      const urlCurrent = new URL(WEATHER_API.FREE_BASE_URL);
      urlCurrent.searchParams.set('lat', lat.toString());
      urlCurrent.searchParams.set('lon', lon.toString());
      urlCurrent.searchParams.set('appid', API_KEY);
      urlCurrent.searchParams.set('units', units); // use passed units parameter
      // urlCurrent.searchParams.set('lang', ''); // to set language
      // urlCurrent.searchParams.set('exclude', ''); // to exclude certain params; see docs: https://openweathermap.org/api/one-call-3#current

      const response = await fetch(urlCurrent);

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

  getForecastWeather: async (
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Promise<ForecastWeatherResponse> => {
    try {
      // Forecast weather
      const urlForecast = new URL(WEATHER_API.FREE_FORECAST_URL);
      urlForecast.searchParams.set('lat', lat.toString());
      urlForecast.searchParams.set('lon', lon.toString());
      urlForecast.searchParams.set('units', units);
      urlForecast.searchParams.set('appid', API_KEY);

      const response = await fetch(urlForecast);

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

      return rawData as ForecastWeatherResponse;
    } catch (err) {
      if (err instanceof WeatherAPIError) {
        throw err;
      }

      // For network errors, fetch errors, etc.
      throw new WeatherAPIError('HTTP request failed', 'NETWORK_ERROR');
    }
  },
};
