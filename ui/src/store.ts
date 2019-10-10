import Vue from 'vue';
import Vuex from 'vuex';
import { IListing } from './services/mock-data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: []
  },
  mutations: {
    addItemToCart(state: any, item: IListing){
      state.cartItems.push(item);
    }
  },
  actions: {

  },
});
