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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{ isActive: boolean }>();
</script>
