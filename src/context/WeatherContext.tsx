import React, { createContext, useContext, ReactNode, useState } from 'react';
import {
  WeatherContextType,
  CurrentWeatherFreeResponse,
} from '../types/weather';
import { weatherAPI } from '@/services/weatherAPI';
import { WeatherAPIError } from '@/utils/helpers';

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [state, dispatch] = useReducer(weatherReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] =
    useState<CurrentWeatherFreeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add any additional context methods here
  // Example: fetchWeather, toggleUnit, clearError, etc.

  const getWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await weatherAPI.getCurrentWeather(lat, lon);
      setWeatherData(response);
    } catch (err) {
      if (err instanceof WeatherAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // global state
    loading,
    weatherData,
    error,

    // gloabl actions
    getWeatherData,

    // TODO
    // state,
    // dispatch,
    // Add your methods here
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
