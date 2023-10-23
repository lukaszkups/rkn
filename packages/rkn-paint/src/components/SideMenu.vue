<script setup lang="ts">
import ColorList from './ColorList.vue';
import SpritesList from './SpritesList.vue';
</script>
<template>
<div class="rkn-column-menu">
  <sprites-list />
</div>
<div class="rkn-column-menu">
  <color-list />
</div>
</template>
<style scoped lang="scss">
.rkn-column-menu {
  flex: 1;
  max-width: 250px;
  min-height: 100vh;
  box-shadow: var(--rkn-shadow);
  box-sizing: border-box;
}
</style>
