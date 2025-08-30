import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { weatherAPI } from '../../services/weatherAPI';
import { UI_CONSTANTS, WEATHER_API } from '@/utils/constants';
import { WeatherAPIError } from '@/utils/helpers';
import { WeatherSearchProps, WeatherLocationType } from '@/types/weather';
import { useWeatherContext, WeatherContext } from '@/context/WeatherContext';

const WeatherSearch = ({ loading }: WeatherSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locations, setLocations] = useState<WeatherLocationType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [citySearchLoading, setCitySearchLoading] = useState(false);

  const { lastSearchedCity, clearError, getWeatherData, error } =
    useWeatherContext();

  //   Submit is for intended form submission. From onChange MUI component
  const handleSubmit = (cityObject: WeatherLocationType) => {
    clearError();
    setErrorMessage('');
    setLocations([]);
    setSearchTerm('');
    setCitySearchLoading(false);
    // fetches current & forecast weather data, & sets global context
    getWeatherData(cityObject.lat, cityObject.lon);
  };

  const handleWeatherAPIError = (err: WeatherAPIError) => {
    switch (err.code) {
      case '404':
        return 'Weather service not found. Please try again later.';
      case '401':
        return 'API key issue. Please contact support.';
      case 'INVALID_RESPONSE':
        return 'Sorry there is an issue with the service. Please try again later.';
      case 'NETWORK_ERROR':
        return 'Network error. Please try again later.';
      default:
        return 'Something went wrong. Please try again later.';
    }
  };

  // fetches & returns updated search results on user search keypress
  useEffect(() => {
    // Clear messages when search term is empty
    if (searchTerm.length === 0) {
      setMessage('');
      setErrorMessage('');
      setLocations([]);
      return;
    }

    const fetchCities = async () => {
      setCitySearchLoading(true);
      try {
        const data = await weatherAPI.getCurrentCitySearch(searchTerm);

        if (data.length === 0 && searchTerm.length > 0) {
          const newMessage =
            searchTerm.length < WEATHER_API.API_QUERY_MIN
              ? 'Keep typing...'
              : 'No cities found';
          setMessage(newMessage);
          setLocations([]);
        } else if (data.length > 0) {
          setLocations(data);
          setMessage('');
        }
      } catch (err) {
        if (err instanceof WeatherAPIError) {
          const message = handleWeatherAPIError(err);
          setErrorMessage(message);
        } else {
          // Handle unexpected errors (network issues, etc.)
          setErrorMessage('An unexpected error occurred');
        }
      } finally {
        setCitySearchLoading(false);
      }
    };
    fetchCities();
  }, [searchTerm]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      {/* Search status messages - Fixed height to prevent UI shifting */}
      <Box
        sx={{
          height: 24, // Fixed height for consistent spacing
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {message && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem', fontStyle: 'italic' }}
          >
            {message}
          </Typography>
        )}
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ fontSize: '0.875rem' }}
          >
            {errorMessage}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Autocomplete
          freeSolo
          fullWidth
          disableClearable
          inputValue={searchTerm}
          options={locations}
          value={null as any} // resolves the 'No cities found' message on dropdown selection
          getOptionLabel={(option: string | WeatherLocationType) => {
            if (typeof option === 'string') {
              return option;
            }
            return option.state
              ? `${option.name}, ${option.state}, ${option.country}`
              : `${option.name}, ${option.country}`;
          }}
          getOptionKey={(option: string | WeatherLocationType) => {
            if (typeof option === 'string') {
              return option;
            }
            return `${option.lat}-${option.lon}`;
          }}
          filterOptions={(options) => options}
          onInputChange={(e, value) => {
            setSearchTerm(value);
          }}
          onChange={(
            event: any,
            cityObject: string | WeatherLocationType | null
          ) => {
            if (cityObject && typeof cityObject === 'object') {
              handleSubmit(cityObject);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a city"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {citySearchLoading && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              inputProps={{
                ...params.inputProps,
                type: 'search',
                placeholder: 'Search for a city...',
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default WeatherSearch;
