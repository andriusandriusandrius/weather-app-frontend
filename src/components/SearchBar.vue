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
import { getUserFriendlyMessage } from "../utils/getUserFriendlyErrorMessages";

const query = ref("");
const emit = defineEmits<{
  (e: "results", data: WeatherData | null): void;
  (e: "warning", message: string): void;
}>();
async function search() {
  const searchQuery = query.value.trim();

  if (!searchQuery) {
    const msg =
      "Please enter a city, ZIP code(e.g 10002,US) or coordinates(seperated by comma)";
    emit("results", null);
    emit("warning", msg);
    return;
  }

  try {
    const data = await searchWeather(searchQuery);
    emit("results", data);
    emit("warning", "");
  } catch (error: any) {
    const msg = getUserFriendlyMessage(error);
    emit("results", null);
    emit("warning", msg);
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
