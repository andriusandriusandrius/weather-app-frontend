import type { Sky } from "../types/WeatherData";

export function sunninessMapper(id: number): Sky {
  if (id >= 200 && id <= 232) {
    return "thunderstorm";
  } else if (id >= 300 && id <= 321) {
    return "drizzle";
  } else if (id >= 500 && id <= 531) {
    return "rain";
  } else if (id >= 600 && id <= 622) {
    return "snow";
  } else if (id >= 600 && id <= 622) {
    return "snow";
  } else if (id >= 700 && id <= 781) {
    return "foggy";
  } else if (id >= 700 && id <= 762) {
    return "foggy";
  } else if (id == 800) {
    return "clear";
  } else if (id >= 801 && id <= 804) {
    return "cloudy";
  }
  return "unkown";
}
