<template>
  <div class="field" style="max-width: 300px">
    <p class="control has-icons-left">
      <input
        class="input"
        type="text"
        placeholder="Search forecast..."
        v-model="query"
      />
    </p>
    <div class="control">
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
