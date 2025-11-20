export type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  sunniness: Sky;
};
export type Sky =
  | "cloudy"
  | "thunderstorm"
  | "drizzle"
  | "rain"
  | "snow"
  | "foggy"
  | "clear"
  | "unknown";
