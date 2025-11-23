<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <div class="modal-card-title is-flex">
          <slot />
        </div>
        <button class="delete" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">
        <slot name="content" />
      </section>

      <footer class="modal-card-foot is-flex" style="gap: 0.5rem">
        <button class="button is-success" @click="$emit('ok')">OK</button>
        <button class="button" @click="$emit('cancel')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{ isActive: boolean }>();
</script>
