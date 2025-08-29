import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  CircularProgress,
  InputAdornment,
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

  const { getWeatherData } = useWeatherContext();

  // console.log(errorMessage);
  // console.log(message);
  // console.log(locations);

  //   Submit is for intended form submission. From onChange MUI component
  const handleSubmit = (cityObject: WeatherLocationType) => {
    // e.preventDefault();
    // TODO: Add validation and call onSearch
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
    const fetchCities = async () => {
      setCitySearchLoading(true);
      try {
        const data = await weatherAPI.getCurrentCitySearch(searchTerm);

        if (data.length === 0 && searchTerm.length > 0) {
          setMessage(
            searchTerm.length < WEATHER_API.API_QUERY_MIN
              ? 'Keep typing...'
              : 'No cities found'
          );
        } else {
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
        gap: 2,
        alignItems: 'center',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Autocomplete
        freeSolo
        fullWidth
        disableClearable
        options={locations}
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
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        startIcon={<Search />}
        disabled={loading}
        sx={{
          minWidth: 120,
          height: 56, // Match TextField height
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </Box>
  );
};

export default WeatherSearch;
