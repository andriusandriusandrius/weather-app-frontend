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
      <button class="button is-info" @click="search">Search</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const query = ref("");
function search() {
  console.log("just searched for", query.value);
}
</script>
