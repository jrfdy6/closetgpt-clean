export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
}

export type WeatherCondition = 
  | 'clear'
  | 'partly_cloudy'
  | 'cloudy'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'fog'
  | 'windy'; 