<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: String || Number,
    requred: true,
  },
  inputType: {
    type: String,
    required: false,
    default: 'text',
  }
});

const emit = defineEmits(['update:model-value']);

const localInput = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit('update:model-value', newVal);
  }
})
</script>
<template>
<div class="rkn-row rkn-input__wrapper">
  <div class="rkn-col">
    <label>{{ props.label }}</label>
  </div>
  <div class="rkn-col rkn-col--2">
    <input 
      class="rkn-input"
      :type="props.inputType" 
      v-model="localInput" 
    />
  </div>
</div>
</template>
<style lang="scss">
.rkn-input {
  padding: 3px 5px;
  border-radius: 3px;
  outline: none;
  border: 1px solid var(--rkn-shadow-color);

  &:focus {
    border-color: var(--rkn-primary-color);
  }

  &__wrapper {
    label {
      vertical-align: middle;
    }
  }
}
</style>
