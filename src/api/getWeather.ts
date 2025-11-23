import type { FetchMode, WeatherData } from "../types/WeatherData";
import { sunninessMapper } from "../utils/sunninessMapper";
import { timeConverter } from "../utils/timeConverter";
import { baseApi } from "./baseApi";

export async function getWeather(input: string, mode: FetchMode) {
  const response = await buildApiCall(input, mode);
  const data = response.data;

  const weather: WeatherData = {
    city: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    sunrise: timeConverter(data.sys.sunrise, data.timezone),
    sunset: timeConverter(data.sys.sunset, data.timezone),
    sunniness: sunninessMapper(data.weather?.[0]?.id),
    lastUpdated: Date.now(),
  };
  return weather;
}
async function buildApiCall(input: string, mode: FetchMode) {
  const apiKey = import.meta.env.VITE_API_KEY;

  switch (mode) {
    case "city":
      const city = input;
      return await baseApi.get("/weather", {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });

    case "zip":
      const zip = input;
      return await baseApi.get("/weather", {
        params: {
          zip: zip,
          appid: apiKey,
          units: "metric",
        },
      });
    case "latlon":
      const [latStr, lonStr] = input.split(",");
      if (!latStr || !lonStr) throw new Error("Couldnt parse latlon");
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);
      return await baseApi.get("/weather", {
        params: {
          lat: lat,
          lon: lon,
          appid: apiKey,
          units: "metric",
        },
      });
  }
}
