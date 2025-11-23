<script setup lang="ts">
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { computed, ref } from "vue";

import AddForecastModal from "./components/AddForecastModal.vue";
import type { WeatherData } from "./types/WeatherData";
import WeatherForecast from "./components/WeatherForecast.vue";

const showModal = ref(false);
const forecasts = ref<WeatherData[]>([]);
const currentPage = ref(1);
const pageSize = 10;

function addForecast(data: WeatherData) {
  forecasts.value.push(data);
}
const paginatedForecasts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return forecasts.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(forecasts.value.length / pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
function openModal() {
  showModal.value = true;
}
</script>

<template>
  <Layout title="weather.io">
    <AddForecastButton @click="openModal" />
    <div class="is-flex is-flex-direction-column" style="gap: 1rem">
      <WeatherForecast
        v-for="(f, i) in paginatedForecasts"
        :key="i"
        :forecast="f"
      />
    </div>
    <AddForecastModal
      v-if="showModal"
      @add="addForecast"
      @close="showModal = false"
    ></AddForecastModal>
    <div
      class="is-flex is-justify-content-center mt-4"
      style="gap: 1rem"
      v-if="totalPages"
    >
      <button class="button" @click="prevPage" :disabled="currentPage === 1">
        Previous
      </button>

      <span class="is-size-5"> Page {{ currentPage }} / {{ totalPages }} </span>

      <button
        class="button"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </Layout>
</template>
