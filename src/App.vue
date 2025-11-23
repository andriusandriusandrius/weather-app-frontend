<script setup lang="ts">
import AddForecastButton from "./components/AddForecastButton.vue";
import Layout from "./components/Layout.vue";
import { ref } from "vue";

import AddForecastModal from "./components/AddForecastModal.vue";

const showModal = ref(false);

function openModal() {
  showModal.value = true;
}
</script>

<template>
  <Layout title="weather.io">
    <AddForecastButton @click="openModal" />
    <AddForecastModal
      v-if="showModal"
      @close="showModal = false"
    ></AddForecastModal>
  </Layout>
</template>
