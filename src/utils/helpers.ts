import { ForecastWeatherItem } from '@/types/forecastWeather';

// Error type for weather api
export class WeatherAPIError extends Error {
  code: string;
  status?: number;
  constructor(message: string, code: string, status?: number) {
    super(message);
    this.name = 'WeatherAPIError';
    this.code = code;
    this.status = status;
  }
}

// home helper
export const getWeatherGradient = (main: string) => {
  const gradients: Record<string, string> = {
    Clear: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    Clouds: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
    Rain: 'linear-gradient(135deg, #81ecec 0%, #00b894 100%)',
    Snow: 'linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)',
    Thunderstorm: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
    default: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  };
  return gradients[main] || gradients.default;
};

// home helper
export const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

// home helper
export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// home helper
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

// home helper
export const getHourlyForecast = (
  forecastWeatherData: ForecastWeatherItem[],
  cityTimezone: number
) => {
  return forecastWeatherData.slice(0, 8).map((item) => {
    return {
      dt: item.dt,
      time: new Date(item.dt * 1000 + cityTimezone * 1000),
      temp: item.main.temp,
      weather: item.weather[0],
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      pop: item.pop,
    };
  });
};

// home helper
export const getDailyForecast = (
  forecastWeatherData: ForecastWeatherItem[]
) => {
  const grouped: Record<string, any> = {};
  forecastWeatherData.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((item: any) => item.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const mainWeather =
        items.find((item: any) => item.sys.pod === 'd') || items[0];

      return {
        date,
        maxTemp,
        minTemp,
        weather: mainWeather.weather[0],
        items,
      };
    });
};
