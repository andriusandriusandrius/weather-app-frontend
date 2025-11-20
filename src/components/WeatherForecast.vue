<template>
  <div class="card has-text-centered" style="max-width: 250px">
    <div class="card-content">
      <p class="title">{{ city }}</p>

      <p class="my-3 is-size-5">
        <strong>{{ temperature }}°C</strong>
      </p>

      <div>
        <div class="is-flex is-justify-content-space-between is-size-6">
          <div>
            <p>Humidity: {{ humidity }}%</p>
            <p>Wind Speed: {{ wind }} km/h</p>
            <figure class="image is-16x16 is-inline-block">
              <img :src="icon" alt="weather icon" />
            </figure>
          </div>

          <div class="is-size-7">
            <p>Pressure: {{ pressure }} hPa</p>
            <p>Sunrise: {{ sunrise }}</p>
            <p>Sunset: {{ sunset }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type WeatherForecastProps = {
  city: string | undefined;
  icon: string | undefined;
  temperature: number | undefined;
  humidity: number | undefined;
  wind: number | undefined;
  pressure: number | undefined;
  sunrise: string | undefined;
  sunset: string | undefined;
};
defineProps<WeatherForecastProps>();
</script>
