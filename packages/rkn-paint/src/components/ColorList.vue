<script setup lang="ts">
import { computed } from 'vue';
import store from '../store';

const colorList = computed({
  get() {
    return Object.keys(store.state.colors || {}).map((key) => ({ key, value: store.state.colors[key] }));
  },
  set(newVal) {
    const colorsCopy = store.state.colors ? { ...store.state.colors } : {};
    const index = Object.keys(colorsCopy).length;
    colorsCopy[index] = newVal;
    store.dispatch('updateProp', { name: 'colors', colorsCopy });
  }
});

const activeColor = computed({
  get() {
    return store.state.activeColor | 0;
  },
  set(newVal) {
    store.dispatch('updateProp', { name: 'activeColor', value: newVal });
  }
})

const getColorSquareStyle = (color: string) => {
  return `background-color: ${color}`;
}

const getColorListItemClasses = (colorId: number | string) => {
  return {
    'rkn-list-item': true,
    'rkn-list-item--active': Number(colorId) === Number(activeColor.value)
  }
}

const selectColor = (colorId: number) => {
  activeColor.value = colorId;
}
</script>
<template>
<ul class="rkn-list rkn-list--color">
  <li 
    v-for="color in colorList"
    :key="color.key"
    :class="getColorListItemClasses(color.key)"
    @click="selectColor(color.key as unknown as number)"
  >
  <span 
    class="rkn-color-square"
    :style="getColorSquareStyle(color.value)"
  ></span>
  {{ color.value.toUpperCase() }}
  </li>
</ul>
</template>
<style lang="scss">
.rkn-list--color {
  .rkn-list-item {
    padding: 3px 5px 3px 10px;
    display: block;
    cursor: pointer;

    &:hover {
      background-color: var(--rkn-shadow-color);
    }

    &--active {
      color: crimson;
      
      .rkn-color-square {
        border-color: crimson;
      }
    }
  }

}
.rkn-color-square {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border: 1px solid #000;
}
</style>
