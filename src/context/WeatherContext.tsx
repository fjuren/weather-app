import React, { createContext, useContext, ReactNode, useState } from 'react';
import { WeatherContextType } from '../types/weather';
import { weatherAPI } from '@/services/weatherAPI';
import { WeatherAPIError } from '@/utils/helpers';
import { CurrentWeatherFreeResponse } from '@/types/currentWeather';
import { ForecastWeatherResponse } from '@/types/forecastWeather';
import { WEATHER_API } from '@/utils/constants';

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [state, dispatch] = useReducer(weatherReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherFreeResponse | null>(null);
  const [forecastWeatherData, setForecastWeatherData] =
    useState<ForecastWeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<string>(WEATHER_API.UNITS.METRIC);

  // TODO: Add any additional context methods here
  // Example: fetchWeather, toggleUnit, clearError, etc.

  const getWeatherData = async (
    lat: number,
    lon: number,
    selectedUnits?: string
  ) => {
    const unitsToUse = selectedUnits || units;
    setLoading(true);
    setError(null);

    try {
      // both api enpoints called; decided to combine to prevent race condition with loading stae
      const [currentResponse, forecastResponse] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon, unitsToUse),
        weatherAPI.getForecastWeather(lat, lon, unitsToUse),
      ]);

      setCurrentWeatherData(currentResponse);
      setForecastWeatherData(forecastResponse);
      setUnits(unitsToUse);
    } catch (err) {
      // stops response if either api call encounters an issue
      if (err instanceof WeatherAPIError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }

      // clear data if error
      setCurrentWeatherData(null);
      setForecastWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnits = async () => {
    const newUnits =
      units === WEATHER_API.UNITS.METRIC
        ? WEATHER_API.UNITS.IMPERIAL
        : WEATHER_API.UNITS.METRIC;

    // If we have current weather data, re-fetch with new units
    if (currentWeatherData) {
      await getWeatherData(
        currentWeatherData.coord.lat,
        currentWeatherData.coord.lon,
        newUnits
      );
    } else {
      setUnits(newUnits);
    }
  };

  const value = {
    // global state
    loading,
    currentWeatherData,
    forecastWeatherData,
    error,
    units,

    // global actions
    getWeatherData,
    toggleUnits,

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
