<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  modalVisibility: {
    type: Boolean,
    required: false,
    default: false,
  },
  showShadow: {
    type: Boolean,
    required: false,
    default: true,
  },
  modalTitle: {
    type: String,
    required: false,
    default: '',
  }
});

const rknModalRef = ref(null);

const emit = defineEmits(['update:modalVisibility', 'onCancel', 'onSubmit']);

const modalVisibilityLocal = computed({
  get() {
    return props.modalVisibility;
  },
  set(newVal) {
    emit('update:modalVisibility', newVal);
  }
});

const closeModal = () => {
  emit('onCancel');
  modalVisibilityLocal.value = false;
}

const onCancel = () => {
  emit('onCancel');
  closeModal();
}

const onSubmit = () => {
  emit('onSubmit');
  closeModal();
}

const getComputedStyle = () => {
  const modal = rknModalRef.value as unknown as Element;
  if (modal) {
    const w = modal.clientWidth/2;
    return `left: calc(50% - ${w}px`;
  }
  return ``;
}
</script>
<template>
<div
  v-if="modalVisibilityLocal && showShadow"
  class="rkn-modal__shadow"
></div>
<div 
  v-if="modalVisibilityLocal"
  ref="rknModalRef"
  class="rkn-modal"
  :style="getComputedStyle()"
>
  <div class="rkn-modal__header">
    <div class="rkn-row">
      <div class="rkn-col">{{ props.modalTitle }}</div>
      <div class="rkn-col">
        <span 
          class="rkn-modal__close-btn"
          @click="closeModal"
        >&times;</span>
      </div>
    </div>
  </div>
  <div class="rkn-modal__content">
    <slot></slot>
  </div>
  <div class="rkn-modal__footer">
    <button 
      class="rkn-btn"
      @click="onCancel"
    >Cancel</button>
    <button 
      class="rkn-btn rkn-btn--primary"
      @click="onSubmit"
    >Submit</button>
  </div>
</div>
</template>
<style lang="scss">
.rkn-modal {
  position: fixed;
  margin: 10% auto auto auto;
  background: #fff;
  border-radius: 3px;
  box-shadow: var(--rkn-shadow);
  min-width: 300px;
  z-index: 100;

  &__header {
    padding: 8px;
    border-bottom: 1px solid var(--rkn-shadow-color);
  }

  &__close-btn {
    float: right;
    margin-right: 2px;
    cursor: pointer;
    font-weight: 900;
  }

  &__footer {
    padding: 8px;
    border-top: 1px solid var(--rkn-shadow-color);

    .rkn-btn--primary {
      float: right;
    }
  }

  &__content {
    padding: 8px;
    min-height: 50px;
  }

  &__shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.1); 
    display: block;
  }
}
</style>