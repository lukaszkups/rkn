<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import RknInput from './RknInput.vue';

const modalVisibility = ref(true);
const spriteName = ref('');
</script>
<template>
<modal
  v-model:modal-visibility="modalVisibility"
>
  <p>{{ spriteName }}</p>
  <rkn-input 
    label="Sprite name"
    v-model="spriteName"
  />
</modal>
</template>
<style lang="scss">
</style>