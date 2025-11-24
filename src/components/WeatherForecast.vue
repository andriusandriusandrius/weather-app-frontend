<template>
  <div class="card has-text-centered" style="max-width: 400px">
    <button
      class="button is-danger"
      @click="$emit('delete')"
      style="margin-top: 1rem"
    >
      X
    </button>
    <div class="card-content">
      <p class="title">{{ forecast.city }}</p>

      <p class="my-3 is-size-5">
        <strong>{{ forecast.temperature }}°C</strong>
      </p>
      <figure class="image is-32x32 is-inline-block">
        <img :src="getIcon(forecast.sunniness)" alt="weather icon" />
      </figure>
      <div>
        <div class="is-flex is-justify-content-space-between is-size-6">
          <div>
            <p>Humidity: {{ forecast.humidity }}%</p>
            <p>Wind Speed: {{ forecast.windSpeed }} km/h</p>
          </div>

          <div class="is-size-7">
            <p>Pressure: {{ forecast.pressure }} hPa</p>
            <p>Sunrise: {{ forecast.sunrise }}</p>
            <p>Sunset: {{ forecast.sunset }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WeatherData } from "../types/WeatherData";
import { getIcon } from "../utils/getIcon";
type WeatherForecastProps = {
  forecast: WeatherData;
};
defineProps<WeatherForecastProps>();
</script>
