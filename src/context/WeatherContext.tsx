import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import {
  WeatherContextType,
  WeatherState,
  WeatherAction,
} from '../types/weather';
import { weatherAPI } from '@/services/weatherAPI';
import { WeatherAPIError } from '@/utils/helpers';
import { UI_CONSTANTS, WEATHER_API } from '@/utils/constants';

const appReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case 'GET_WEATHER_DATA_START':
      return { ...state, loading: true, error: null };

    case 'GET_WEATHER_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        currentWeatherData: action.payload.currentWeather,
        forecastWeatherData: action.payload.forecastWeather,
        units: action.payload.units,
        lastSearchedCity: action.payload.cityName,
        error: null,
      };

    case 'GET_WEATHER_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentWeatherData: null,
        forecastWeatherData: null,
        lastSearchedCity: '',
      };

    case 'TOGGLE_UNITS':
      return { ...state, units: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
};

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: WeatherState = {
    loading: false,
    error: null,
    currentWeatherData: null,
    forecastWeatherData: null,
    units: WEATHER_API.UNITS.METRIC,
    lastSearchedCity: '',
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getWeatherData = async (
    lat: number,
    lon: number,
    selectedUnits?: string
  ) => {
    const unitsToUse = selectedUnits || state.units;
    dispatch({ type: 'GET_WEATHER_DATA_START' });

    try {
      // both api endpoints called; decided to combine to prevent race condition with loading state
      const [currentResponse, forecastResponse] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon, unitsToUse),
        weatherAPI.getForecastWeather(lat, lon, unitsToUse),
      ]);

      dispatch({
        type: 'GET_WEATHER_DATA_SUCCESS',
        payload: {
          currentWeather: currentResponse,
          forecastWeather: forecastResponse,
          units: unitsToUse,
          cityName: currentResponse.name,
        },
      });
    } catch (err) {
      // stops response if either api call encounters an issue
      if (err instanceof WeatherAPIError) {
        dispatch({ type: 'GET_WEATHER_DATA_ERROR', payload: err.message });
      } else if (err instanceof Error) {
        dispatch({ type: 'GET_WEATHER_DATA_ERROR', payload: err.message });
      } else {
        dispatch({
          type: 'GET_WEATHER_DATA_ERROR',
          payload: UI_CONSTANTS.ERRORS.UNKNOWN_ERROR,
        });
      }
    }
  };

  const toggleUnits = async () => {
    const newUnits =
      state.units === WEATHER_API.UNITS.METRIC
        ? WEATHER_API.UNITS.IMPERIAL
        : WEATHER_API.UNITS.METRIC;

    dispatch({ type: 'TOGGLE_UNITS', payload: newUnits });

    // if we have current weather data, re-fetch with new units
    if (state.currentWeatherData) {
      await getWeatherData(
        state.currentWeatherData.coord.lat,
        state.currentWeatherData.coord.lon,
        newUnits
      );
    }
  };

  // remove prior error message
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    // global state
    loading: state.loading,
    currentWeatherData: state.currentWeatherData,
    forecastWeatherData: state.forecastWeatherData,
    error: state.error,
    units: state.units,
    lastSearchedCity: state.lastSearchedCity,

    // global actions
    getWeatherData,
    toggleUnits,
    clearError,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

// add type safety to context
export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

// create a custom useContext hook to handle type safety
export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      'useWeatherContext must be used witihn Weather Context Provider'
    );
  }
  return context;
};
