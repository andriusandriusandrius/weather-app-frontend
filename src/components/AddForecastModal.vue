<template>
  <Modal :isActive="true" @close="$emit('close')">
    <SearchBar @results="handleResults" @warning="modalWarning = $event" />
    <template #content>
      <div v-if="result">
        <h3 class="title is-4">{{ result.city }}</h3>
        <p>Temperature: {{ result.temperature }} C</p>
        <figure class="image is-16x16 is-inline-block">
          <img :src="getIcon(result.sunniness)" alt="weather icon" />
        </figure>
        <button
          class="button is-primary"
          @click="
            if (result) {
              emit('add', result);
              emit('close');
            }
          "
        >
          +
        </button>
      </div>
      <p v-if="modalWarning" class="has-text-danger">{{ modalWarning }}</p>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { WeatherData } from "../types/WeatherData";
import { getIcon } from "../utils/getIcon";
import SearchBar from "./SearchBar.vue";
import Modal from "./Modal.vue";
const modalWarning = ref<string>();
const result = ref<WeatherData | null>(null);
const emit = defineEmits<{
  (e: "close"): void;
  (e: "add", data: WeatherData): void;
}>();

function handleResults(data: WeatherData | null) {
  result.value = data;
}
</script>
