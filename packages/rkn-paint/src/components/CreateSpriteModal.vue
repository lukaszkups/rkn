<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const modalVisibility = ref(true);
const spriteName = ref('');
</script>
<template>
<modal
  v-model:modal-visibility="modalVisibility"
>
  <input 
    type="text" 
    class="rkn-input" 
    v-model="spriteName"
  />
</modal>
</template>
<style lang="scss">
</style>