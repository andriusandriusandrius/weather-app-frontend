<script setup lang="ts">
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import AddForecastModal from "./components/AddForecastModal.vue";
import type { WeatherData } from "./types/WeatherData";
import WeatherForecast from "./components/WeatherForecast.vue";
import SearchBarLocal from "./components/SearchBarLocal.vue";
import { getWeather } from "./api/getWeather";

const showModal = ref(false);
const error = ref("");
const forecasts = ref<WeatherData[]>([]);
const currentPage = ref(1);
const pageSize = 10;
const savedForecasts = localStorage.getItem("forecasts");
const searchTerm = ref("");
const REFRESH_INTERVAL = 60 * 1000;
let refreshTimerId: number | null = null;

if (savedForecasts) {
  forecasts.value = JSON.parse(savedForecasts);
}

function addForecast(data: WeatherData) {
  forecasts.value.push(data);
}

watch(
  forecasts,
  (newValue) => {
    localStorage.setItem("forecasts", JSON.stringify(newValue));
  },
  { deep: true }
);
async function refreshAllForecasts() {
  const refreshPromises = forecasts.value.map(async (forecast, index) => {
    try {
      const updated = await getWeather(forecast?.city, "city");
      forecasts.value[index] = updated;
    } catch (err: any) {
      error.value = err.message;
    }
  });

  await Promise.allSettled(refreshPromises);
}
const filteredForecasts = computed(() => {
  if (!searchTerm.value) return forecasts.value;
  return forecasts.value.filter((f) =>
    f.city.toLowerCase().includes(searchTerm.value)
  );
});

const paginatedForecasts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredForecasts.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(filteredForecasts.value.length / pageSize);
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
function searchLocal(text: string) {
  searchTerm.value = text;
}
function openModal() {
  showModal.value = true;
}
function deleteForecast(i: number) {
  forecasts.value.splice(i, 1);
}

onMounted(() => {
  refreshAllForecasts();
  refreshTimerId = window.setInterval(refreshAllForecasts, REFRESH_INTERVAL);
});

onUnmounted(() => {
  if (refreshTimerId) {
    clearInterval(refreshTimerId);
  }
});
</script>

<template>
  <Layout title="weather.io">
    <p v-if="error" class="has-text-danger">{{ error }}</p>
    <SearchBarLocal @search="searchLocal" />
    <AddForecastButton @click="openModal" />
    <div class="is-flex is-flex-direction-column" style="gap: 1rem">
      <WeatherForecast
        v-for="(f, i) in paginatedForecasts"
        @delete="deleteForecast(i)"
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
