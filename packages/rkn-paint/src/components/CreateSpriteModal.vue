<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from './Modal.vue';
import RknInput from './RknInput.vue';

const modalVisibility = ref(true);
const props = defineProps({
  modalVisibility: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['update:modalVisibility']);

const modalVisibilityLocal = computed({
  get() {
    return props.modalVisibility;
  },
  set(newVal) {
    emit('update:modalVisibility', newVal);
  }
})
const spriteName = ref('');

const onSubmit = () => {
  
}
</script>
<template>
<modal
  v-model:modal-visibility="modalVisibilityLocal"
  @on-submit="onSubmit"
>
  <rkn-input 
    label="Sprite name"
    v-model="spriteName"
  />
</modal>
</template>
<style lang="scss">
</style>