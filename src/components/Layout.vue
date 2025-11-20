<template>
  <header class="mb-4 has-text-centered">
    <h1>{{ title }}</h1>
  </header>
  <main class="is-flex is-flex-direction-column is-gap-4 is-align-items-center">
    <slot></slot>
  </main>
</template>

<script lang="ts" setup>
type LayoutProps = {
  title: string;
};
defineProps<LayoutProps>();
</script>
