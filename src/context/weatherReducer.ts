import { WeatherState } from '../types/weather';

// TODO: Define action types
export type WeatherAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any } // Replace any with proper type
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'TOGGLE_UNIT' }
  | { type: 'SET_LOCATION'; payload: any }; // Add more actions as needed

export const initialState: WeatherState = {
  // TODO: Initialize your state
  // Hint: currentWeather, forecast, loading, error, unit, location
};

export const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'FETCH_START':
      // TODO: Handle loading state
      return state;
    
    case 'FETCH_SUCCESS':
      // TODO: Handle successful API response
      return state;
    
    case 'FETCH_ERROR':
      // TODO: Handle error state
      return state;
    
    case 'TOGGLE_UNIT':
      // TODO: Toggle between Celsius and Fahrenheit
      return state;
    
    case 'SET_LOCATION':
      // TODO: Set location data
      return state;
    
    default:
      return state;
  }
};