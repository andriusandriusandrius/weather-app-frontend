<script setup lang="ts">
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { ref } from "vue";

import AddForecastModal from "./components/AddForecastModal.vue";
import type { WeatherData } from "./types/WeatherData";
import WeatherForecast from "./components/WeatherForecast.vue";

const showModal = ref(false);
const forecasts = ref<WeatherData[]>([]);

function addForecast(data: WeatherData) {
  forecasts.value.push(data);
}
function openModal() {
  showModal.value = true;
}
</script>

<template>
  <Layout title="weather.io">
    <AddForecastButton @click="openModal" />
    <div class="is-flex is-flex-direction-column" style="gap: 1rem">
      <WeatherForecast v-for="(f, i) in forecasts" :key="i" :forecast="f" />
    </div>
    <AddForecastModal
      v-if="showModal"
      @add="addForecast"
      @close="showModal = false"
    ></AddForecastModal>
  </Layout>
</template>
