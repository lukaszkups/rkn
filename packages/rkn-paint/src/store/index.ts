import { createStore } from 'vuex';
import { KeyableInterface } from '../helpers/types';
import createInitialData from './initialMock';

interface UpdatePropPayload {
  name: string;
  value: any;
}

const store = createStore({
  state() {
    return {
      ...createInitialData()
    }
  },
  mutations: {
    updateProp(state: KeyableInterface, payload: UpdatePropPayload) {
      state[payload.name] = payload.value;
    },
  },
  actions: {
    updateProp(context: KeyableInterface, payload: UpdatePropPayload) {
      context.commit('updateProp', payload);
      context.dispatch('saveState'); // TODO - if poor performance then disable this
    },
    loadSavedState(context: KeyableInterface) {
      const savedState = JSON.parse(
        localStorage.getItem('rkn-paint-store') || '{}',
      );
      Object.keys(savedState).forEach((key) => {
        console.log(key, savedState[key]);
        if (context.state.hasOwnProperty(key)) {
          context.commit('updateProp', { name: key, value: savedState[key] });
        }
      });
    },
    saveState(context: KeyableInterface) {
      localStorage.setItem(
        'rkn-paint-store',
        JSON.stringify(context.state || {}),
      );
    },
    createSprite(context: KeyableInterface, spriteName: string) {
      const frames = [];
      for(let x = 0; x < context.state.spriteSize; x++) {
        frames.push(new Array(context.state.spriteSize));
      }
      const spriteId = Object.keys(context.state.sprites).length + 1;
      const newSprite = {
        id: spriteId,
        animations: [frames]
      }
      context.commit('createSprite', newSprite);
    }
  }
});

export default store;
