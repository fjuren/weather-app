// Weather API Constants
export const WEATHER_API = {
  // API Configuration - Updated URLs
  SUBSCRIPTIONG_BASE_URL: 'https://api.openweathermap.org/data/3.0/onecall?',
  // https://openweathermap.org/current
  FREE_BASE_URL: 'https://api.openweathermap.org/data/2.5/weather?',
  // https://openweathermap.org/forecast5
  FREE_FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast?',
  GEO_BASE_URL: 'https://api.openweathermap.org/geo/1.0/direct?',

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
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SEARCH_MESSAGES: {
    TYPING: 'Keep typing...',
    NO_RESULTS: 'No cities found... keep searching',
  },

  // Error Messages
  ERRORS: {
    NETWORK_ERROR: 'Network error occurred while fetching weather data',
    NOT_FOUND: 'Weather service not found. Please try again later.',
    UNAUTHORIZED: 'API key issue. Please contact support.',
    INVALID_RESPONSE:
      'Sorry there is an issue with the service. Please try again later.',
    UNKNOWN_ERROR: 'Something went wrong. Please try again later.',
  },

  // General text found on forms
  FORM_TEXT: {
    SEARCH_LABEL: 'Search for a city',
    SEARCH_PLACEHOLDER: 'Start typing',
  },
} as const;
