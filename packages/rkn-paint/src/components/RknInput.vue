<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  input: {
    type: String || Number,
    requred: true,
  }
});

const localInput = computed({
  get() {
    return props.input;
  },
  set(newVal) {
    
  }
})
</script>
<template>
<div class="rkn-row">
  <div class="rkn-col">
    <label>{{ props.label }}</label>
  </div>
</div>
</template>
<style lang="scss">
</style>