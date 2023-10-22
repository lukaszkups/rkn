<script setup lang="ts">
import { computed } from 'vue';
import store from '../store';

const gridSize = computed(() => {
  return store.state.gridSize || 8;
})
</script>
<template>
<div class="rkn-grid-wrapper">
  <div
    class="rkn-grid-row"
  ></div>
</div>
</template>
<style lang="scss">
</style>