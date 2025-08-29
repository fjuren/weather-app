// Weather API Constants
export const WEATHER_API = {
  // API Configuration - Updated URLs
  SUBSCRIPTIONG_BASE_URL: 'https://api.openweathermap.org/data/3.0/onecall?',
  // https://openweathermap.org/current
  FREE_BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?',
  // https://openweathermap.org/forecast5
  FREE_FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast?',
  GEO_BASE_URL: 'http://api.openweathermap.org/geo/1.0/direct?',

  // Query Parameters
  API_QUERY_MIN: 4,
  DEFAULT_LIMIT: 5,
  MAX_LIMIT: 10,

  // Units
  UNITS: {
    METRIC: 'metric', // Celsius, m/s, mm
    IMPERIAL: 'imperial', // Fahrenheit, mph, inches
    STANDARD: 'standard', // Kelvin, m/s, mm
  },

  // Error Messages
  ERRORS: {
    NETWORK_ERROR: 'Network error occurred while fetching weather data',
    INVALID_LOCATION: 'Invalid location provided',
    GEOLOCATION_ERROR: 'Unable to retrieve your location',
  },
} as const;

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300, // ms
  MIN_SEARCH_LENGTH: 2,
  MAX_RESULTS_DISPLAY: 8,
  AUTO_SELECT_THRESHOLD: 1, // Auto-select if only 1 exact match
} as const;

// UI Constants
export const UI_CONSTANTS = {
  LOADING_MESSAGES: {
    SEARCHING: 'Searching...',
    LOADING_WEATHER: 'Loading weather data...',
    GETTING_LOCATION: 'Getting your location...',
  },
  PLACEHOLDERS: {
    SEARCH: 'Enter city name (e.g., Vancouver, London, New York)...',
  },
} as const;
