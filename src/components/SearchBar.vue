<template>
  <div
    class="is-flex is-justify-content-center is-align-items-center"
    style="gap: 0.5rem"
  >
    <p class="has-icons-left">
      <input
        class="input"
        type="text"
        placeholder="Search forecast..."
        v-model="query"
      />
    </p>
    <div>
      <button class="button is-primary" @click="search">Search</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getWeather } from "../api/getWeather";
import type { WeatherData } from "../types/WeatherData";

const query = ref("");
const warning = ref("");
const emit = defineEmits<{
  (e: "results", data: WeatherData): void;
}>();
async function search() {
  warning.value = "";
  const searchQuery = query.value.trim();
  if (!searchQuery) {
    warning.value =
      "Please enter a city, ZIP code(code, country-tag) or coordinates(seperated by comma)";
    return;
  }

  try {
    const data = await searchWeather(searchQuery);
    emit("results", data);
  } catch (error: any) {
    warning.value = error.message;
  }
}

async function searchWeather(input: string) {
  const isZip = /^\d+,[A-Z]{2}$/.test(input);
  const isLatLon = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(input);
  let res: WeatherData;
  if (isZip) {
    res = await getWeather(input, "zip");
  } else if (isLatLon) {
    res = await getWeather(input, "latlon");
  } else {
    res = await getWeather(input, "city");
  }
  if (!res) throw new Error("No location found");

  return res;
}
</script>
