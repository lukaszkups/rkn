<script setup lang="ts">
import { ref } from 'vue';
import CreateSpriteModal from './CreateSpriteModal.vue';

const showCreateSpriteModal = ref(false);
</script>
<template>
<create-sprite-modal 
	v-model:modal-visibility="showCreateSpriteModal"
/>
<button 
	class="rkn-btn rkn-btn--primary"
  @click="showCreateSpriteModal = true"
>Create Sprite</button>
</template>
<style lang="scss">
</style>
