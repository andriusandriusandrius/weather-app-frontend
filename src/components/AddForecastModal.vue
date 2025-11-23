<template>
  <Modal :isActive="true" @close="$emit('close')">
    <SearchBar @results="handleResults" />
    <template #content>
      <div v-if="result">
        <h3 class="title is-4">{{ result.city }}</h3>
        <p>Temp: {{ result.temperature }} C</p>
        <figure class="image is-16x16 is-inline-block">
          <img :src="getIcon(result.sunniness)" alt="weather icon" />
        </figure>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { WeatherData } from "../types/WeatherData";
import { getIcon } from "../utils/getIcon";
import SearchBar from "./SearchBar.vue";
import Modal from "./Modal.vue";

const result = ref<WeatherData | null>(null);
function handleResults(data: WeatherData | null) {
  result.value = data;
}
</script>
