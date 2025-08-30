import { CurrentWeatherFreeResponse } from './currentWeather';
import { ForecastWeatherResponse } from './forecastWeather';

export interface WeatherState {
  loading: boolean;
  currentWeatherData: CurrentWeatherFreeResponse | null;
  forecastWeatherData: ForecastWeatherResponse | null;
  error: string | null;
  units: string;
  lastSearchedCity: string;
}

export type WeatherAction =
  | { type: 'GET_WEATHER_DATA_START' }
  | {
      type: 'GET_WEATHER_DATA_SUCCESS';
      payload: {
        currentWeather: CurrentWeatherFreeResponse;
        forecastWeather: ForecastWeatherResponse;
        units: string;
        cityName: string;
      };
    }
  | { type: 'GET_WEATHER_DATA_ERROR'; payload: string }
  | { type: 'TOGGLE_UNITS'; payload: string }
  | { type: 'CLEAR_ERROR' };

export interface WeatherContextType {
  // global state
  loading: boolean;
  currentWeatherData: CurrentWeatherFreeResponse | null;
  forecastWeatherData: ForecastWeatherResponse | null;
  error: string | null;
  units: string;
  lastSearchedCity: string;

  // global actions
  getWeatherData: (
    lat: number,
    lon: number,
    selectedUnits?: string
  ) => Promise<void>;
  toggleUnits: () => Promise<void>;
  clearError: () => void;
}

export interface WeatherSearchProps {
  loading?: boolean;
}

export interface WeatherLocationType {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
  local_names?: Record<string, string>;
}

export interface WeatherState {
  loading: boolean;
  error: string | null;
  currentWeatherData: CurrentWeatherFreeResponse | null;
  forecastWeatherData: ForecastWeatherResponse | null;
  units: string;
  lastSearchedCity: string;
}
// export interface CurrentWeatherSubscriptionResponse {
//   lat: number;
//   lon: number;
//   timezone: string;
//   timezone_offset: number;
//   current: CurrentWeather;
//   minutely?: MinutelyWeather[];
//   hourly?: HourlyWeather[];
//   daily?: DailyWeather[];
//   alerts?: WeatherAlert[];
// }

// export interface CurrentWeather {
//   dt: number;
//   sunrise?: number;
//   sunset?: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   clouds: number;
//   uvi: number;
//   visibility: number;
//   wind_speed: number;
//   wind_gust?: number;
//   wind_deg: number;
//   rain?: {
//     '1h'?: number;
//   };
//   snow?: {
//     '1h'?: number;
//   };
//   weather: WeatherCondition[];
// }

// export interface MinutelyWeather {
//   dt: number;
//   precipitation: number;
// }

// export interface HourlyWeather {
//   dt: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   uvi: number;
//   clouds: number;
//   visibility: number;
//   wind_speed: number;
//   wind_gust?: number;
//   wind_deg: number;
//   pop: number;
//   rain?: {
//     '1h'?: number;
//   };
//   snow?: {
//     '1h'?: number;
//   };
//   weather: WeatherCondition[];
// }

// export interface DailyWeather {
//   dt: number;
//   sunrise?: number;
//   sunset?: number;
//   moonrise: number;
//   moonset: number;
//   moon_phase: number;
//   summary: string;
//   temp: {
//     morn: number;
//     day: number;
//     eve: number;
//     night: number;
//     min: number;
//     max: number;
//   };
//   feels_like: {
//     morn: number;
//     day: number;
//     eve: number;
//     night: number;
//   };
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   wind_speed: number;
//   wind_gust?: number;
//   wind_deg: number;
//   clouds: number;
//   uvi: number;
//   pop: number;
//   rain?: number;
//   snow?: number;
//   weather: WeatherCondition[];
// }

// export interface WeatherCondition {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// }

// export interface WeatherAlert {
//   sender_name: string;
//   event: string;
//   start: number;
//   end: number;
//   description: string;
//   tags: string[];
// }

// Add more interfaces as needed
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WeatherError = string | null;
