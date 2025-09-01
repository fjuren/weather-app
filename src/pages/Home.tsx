import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Container,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import WeatherSearch from '../components/weather/WeatherSearch';
import { useWeatherContext } from '@/context/WeatherContext';
import { Air, Opacity, Speed, Visibility } from '@mui/icons-material';
import { WeatherMetrics } from '@/components/weather/WeatherMetrics';
import { ForecastWeatherItem } from '@/types/forecastWeather';
import {
  formatDate,
  formatTime,
  getDailyForecast,
  getHourlyForecast,
  getWeatherGradient,
  getWindDirection,
} from '@/utils/helpers';

const Home: React.FC = () => {
  const {
    loading,
    currentWeatherData,
    forecastWeatherData,
    units,
    toggleUnits,
  } = useWeatherContext();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 2, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 1, sm: 2, md: 0 },
          width: '100%',
        }}
      >
        {/* header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 3, md: 6 },
            color: 'black',
            width: '100%',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 300,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Weather Forecast
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.8,
              mb: 4,
              fontWeight: 300,
            }}
          >
            Get accurate weather information for any city
          </Typography>

          {/* search */}
          <Box
            sx={{
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
            }}
          >
            {/* Unit Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <ToggleButtonGroup
                value={units}
                exclusive
                onChange={toggleUnits}
                aria-label="temperature units"
                size="small"
              >
                <ToggleButton value="metric" aria-label="celsius">
                  °C
                </ToggleButton>
                <ToggleButton value="imperial" aria-label="fahrenheit">
                  °F
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Paper
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <WeatherSearch />
            </Paper>
          </Box>
        </Box>

        {/* spinner */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
              width: '100%',
            }}
          >
            <CircularProgress size={60} thickness={4} color="primary" />
          </Box>
        )}

        {/* all weather information */}
        {currentWeatherData && !loading && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: { xs: 0, sm: 1, md: 0 },
            }}
          >
            {/* current weather card */}
            <Card
              elevation={12}
              sx={{
                mb: { xs: 3, md: 6 },
                background: getWeatherGradient(
                  currentWeatherData.weather[0].main
                ),
                color: 'white',
                borderRadius: 6,
                overflow: 'hidden',
                width: '100%',
                maxWidth: 900,
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{ fontWeight: 300, mb: 3 }}
                    >
                      {currentWeatherData.name},{' '}
                      {currentWeatherData.sys.country}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 4,
                        mb: 3,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontWeight: 100,
                          fontSize: { xs: '4rem', md: '6rem' },
                          lineHeight: 0.8,
                        }}
                      >
                        {Math.round(currentWeatherData.main.temp)}°
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Feels like{' '}
                          {Math.round(currentWeatherData.main.feels_like)}°C
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                          H: {Math.round(currentWeatherData.main.temp_max)}° L:{' '}
                          {Math.round(currentWeatherData.main.temp_min)}°
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={
                        currentWeatherData.weather[0].description
                          .charAt(0)
                          .toUpperCase() +
                        currentWeatherData.weather[0].description.slice(1)
                      }
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.25)',
                        color: 'white',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@4x.png`}
                      sx={{
                        width: 150,
                        height: 150,
                        margin: 'auto',
                        bgcolor: 'transparent',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 300,
                        textTransform: 'capitalize',
                      }}
                    >
                      {currentWeatherData.weather[0].main}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* weather metrics including wind, humidity, pressure and visibility*/}
            <Grid
              container
              spacing={{ xs: 1, md: 3 }}
              sx={{ mb: { xs: 3, md: 6 } }}
              justifyContent="center"
            >
              {/* wind */}
              <WeatherMetrics
                icon={Air}
                title="Wind"
                metric={currentWeatherData.wind.speed}
                unit={units === 'metric' ? ' m/s' : ' mph'}
                subtitle={getWindDirection(currentWeatherData.wind.deg)}
              />
              {/* humidity */}
              <WeatherMetrics
                icon={Opacity}
                title="Humidity"
                metric={currentWeatherData.main.humidity}
                unit="%"
                showProgress={true}
                progressValue={currentWeatherData.main.humidity}
                iconColor="info.main"
              />
              {/* pressure */}
              <WeatherMetrics
                icon={Speed}
                title="Pressure"
                metric={currentWeatherData.main.pressure}
                unit=""
                subtitle="hPa"
                iconColor="warning.main"
              />
              {/* visbility */}
              <WeatherMetrics
                icon={Visibility}
                title="Visibility"
                metric={Math.round(currentWeatherData.visibility / 100) / 10}
                unit=""
                subtitle="km"
                iconColor="success.main"
              />
            </Grid>

            {/* hourly (every 3 hour, limited to free api tier) forcasting section */}

            {forecastWeatherData && (
              <Card
                elevation={8}
                sx={{
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  width: '100%',
                  maxWidth: 900,
                }}
              >
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: 300,
                      mb: { xs: 2, md: 4 },
                      textAlign: 'center',
                      fontSize: { xs: '1.5rem', md: '2.125rem' },
                    }}
                  >
                    3 hour Forecast (local times)
                  </Typography>
                  {/* hourly forecast section */}
                  <Grid container spacing={2} justifyContent="center">
                    {getHourlyForecast(
                      forecastWeatherData.list,
                      forecastWeatherData.city.timezone
                    ).map((hour, index) => (
                      <Grid
                        size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
                        key={index}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Card
                          variant="outlined"
                          sx={{
                            textAlign: 'center',
                            py: 2,
                            px: 1,
                            borderRadius: 4,
                            border: '1px solid rgba(0,0,0,0.08)',
                            minWidth: 140,
                            maxWidth: 140,
                            height: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                              fontWeight: 500,
                              fontSize: '0.8rem',
                            }}
                          >
                            {index === 0 ? 'Now' : formatTime(hour.time)}
                          </Typography>

                          <Avatar
                            src={`https://openweathermap.org/img/wn/${hour.weather.icon}@2x.png`}
                            sx={{
                              width: 60,
                              height: 60,
                              margin: 'auto',
                              mb: 1,
                              bgcolor: 'transparent',
                            }}
                          />

                          <Typography
                            variant="body2"
                            sx={{
                              display: 'block',
                              textTransform: 'capitalize',
                              fontWeight: 500,
                              mb: 1,
                              lineHeight: 1.2,
                            }}
                          >
                            {hour.weather.description}
                          </Typography>

                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="text.primary"
                            sx={{ mb: 1 }}
                          >
                            {Math.round(hour.temp)}°
                          </Typography>

                          {/* Precipitation probability */}
                          {hour.pop > 0 && (
                            <Typography
                              variant="caption"
                              color="primary"
                              sx={{
                                fontSize: '0.7rem',
                                display: 'block',
                              }}
                            >
                              {Math.round(hour.pop * 100)}%
                            </Typography>
                          )}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Card>
            )}

            {/* 5 day forecasting section */}
            {forecastWeatherData && (
              <Card
                elevation={8}
                sx={{
                  borderRadius: 6,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  mt: { xs: 3, md: 4 },
                  width: '100%',
                  maxWidth: 900,
                }}
              >
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: 300,
                      mb: { xs: 2, md: 4 },
                      textAlign: 'center',
                      fontSize: { xs: '1.5rem', md: '2.125rem' },
                    }}
                  >
                    5-Day Forecast
                  </Typography>
                  {/* daily forecast section */}
                  <Grid container spacing={4} justifyContent="center">
                    {getDailyForecast(forecastWeatherData.list).map(
                      (day, index) => (
                        <Grid
                          size={{ xs: 12, sm: 6, md: 2.4 }}
                          key={index}
                          sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <Card
                            variant="outlined"
                            sx={{
                              textAlign: 'center',
                              py: 3,
                              borderRadius: 4,
                              border: '1px solid rgba(0,0,0,0.08)',
                              minWidth: 140,
                              maxWidth: 140,
                              height: 200,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              gutterBottom
                              sx={{
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontSize: '0.8rem',
                              }}
                            >
                              {/* give today or future date */}
                              {index === 0
                                ? 'Today'
                                : formatDate(
                                    new Date(day.date).getTime() / 1000
                                  )}
                            </Typography>
                            <Avatar
                              src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                              sx={{
                                width: 60,
                                height: 60,
                                margin: 'auto',
                                mb: 2,
                                bgcolor: 'transparent',
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 2,
                                textTransform: 'capitalize',
                                fontWeight: 500,
                              }}
                            >
                              {day.weather.description}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1.5,
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="text.primary"
                              >
                                {Math.round(day.maxTemp)}°
                              </Typography>
                              <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ fontWeight: 400 }}
                              >
                                {Math.round(day.minTemp)}°
                              </Typography>
                            </Box>
                          </Card>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              </Card>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
