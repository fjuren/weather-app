import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherState } from '../types/weather';

// TODO: Create async thunks for API calls
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (location: string) => {
    // TODO: Implement API call
    // Use weatherAPI service
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (location: string) => {
    // TODO: Implement forecast API call
  }
);

const initialState: WeatherState = {
  // TODO: Same initial state as context version
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      // TODO: Implement unit toggle
    },
    clearError: (state) => {
      // TODO: Clear error state
    },
    setLocation: (state, action: PayloadAction<any>) => {
      // TODO: Set location
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        // TODO: Handle loading
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        // TODO: Handle success
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        // TODO: Handle error
      });
    // Add more cases for forecast
  },
});

export const { toggleUnit, clearError, setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;