import type { WeatherData } from "../types/WeatherData";
import { sunninessMapper } from "../utils/sunninessMapper";
import { timeConverter } from "../utils/timeConverter";
import { baseApi } from "./baseApi";

export async function getWeather(city: string) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await baseApi.get("/weather", {
    params: {
      q: city,
      appid: apiKey,
      units: "metric",
    },
  });
  const data = response.data;

  const weather: WeatherData = {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    sunrise: timeConverter(data.sys.sunrise, data.timezone),
    sunset: timeConverter(data.sys.sunset, data.timezone),
    sunniness: sunninessMapper(data.weather?.[0]?.id) ?? "Unknown",
  };
  return weather;
}
