<script setup lang="ts">
import WeatherForecast from "./components/WeatherForecast.vue";
import sunIcon from "./assets/weather/snow.svg";
import SearchBar from "./components/SearchBar.vue";
</script>

<template>
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
  <SearchBar />
</template>
