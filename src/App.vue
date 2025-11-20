<script setup lang="ts">
import WeatherForecast from "./components/WeatherForecast.vue";
import sunIcon from "./assets/weather/snow.svg";
import SearchBar from "./components/SearchBar.vue";
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { getWeather } from "./api/getWeather";
import { onMounted, ref } from "vue";
const weather = ref(null);

onMounted(async () => {
  weather.value = await getWeather("vilnius");
  console.log(JSON.parse(JSON.stringify(weather.value)));
});
</script>

<template>
  <Layout title="weather.io">
    <SearchBar />
    <AddForecastButton />
    <WeatherForecast
      city="siauliai"
      :icon="sunIcon"
      :temperature="15"
      :humidity="12"
      :wind="3"
      :pressure="3"
      sunrise="06:15"
      sunset="19:15"
    />
  </Layout>
</template>
