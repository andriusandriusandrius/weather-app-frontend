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
  return response.data;
}
