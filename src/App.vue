<script setup lang="ts">
import WeatherForecast from "./components/WeatherForecast.vue";
import { getIcon } from "./utils/getIcon";
import SearchBar from "./components/SearchBar.vue";
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { getWeather } from "./api/getWeather";
import { onMounted, ref } from "vue";
import type { WeatherData } from "./types/WeatherData";

const weather = ref<WeatherData | null>(null);

onMounted(async () => {
  weather.value = await getWeather("vilnius");
});
</script>

<template>
  <Layout title="weather.io">
    <SearchBar />
    <AddForecastButton />
    <WeatherForecast
      :city="weather?.city"
      :icon="getIcon(weather?.sunniness)"
      :temperature="weather?.temperature"
      :humidity="weather?.humidity"
      :wind="weather?.windSpeed"
      :pressure="weather?.pressure"
      :sunrise="weather?.sunrise"
      :sunset="weather?.sunset"
    />
  </Layout>
</template>
