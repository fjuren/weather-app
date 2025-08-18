import React, { useContext, useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import WeatherSearch from '../components/weather/WeatherSearch';
import { useWeatherContext } from '@/context/WeatherContext';
// import WeatherDisplay from '../components/Weather/WeatherDisplay';
// import TemperatureToggle from '../components/Weather/TemperatureToggle';

const Home: React.FC = () => {
  // const { state, dispatch } = useWeather();
  const [loading, setLoading] = useState(false);

  const { weatherData, error } = useWeatherContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
              Weather Forecast
            </Typography>
            <WeatherSearch loading={loading} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2 }}>
            {loading && <p>Loading weather data...</p>}

            {weatherData && !loading && (
              <div>
                <h3>
                  {weatherData.name}, {weatherData.sys.country}
                </h3>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            )}

            {!weatherData && !loading && !error && (
              <p>Search for a city to see weather data</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
