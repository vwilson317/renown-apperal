import Vue from 'vue';
import Vuex from 'vuex';
import { IListing } from './services/mock-data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    initListings: [],
    loading: true,
  },
  mutations: {
    addItemToCart(state: any, item: IListing) {
      state.cartItems.push(item);
    },
    addListings(state: any, listings: IListing[]) {
      state.initListings = listings;
    },
    setLoading(state: any, isLoading: boolean) {
      state.loading = isLoading;
    },
  },
  actions: {

  },
  getters: {
    total(state) {
      let val: number = 0;
      state.cartItems.forEach((currentItem: IListing) => {
          val += parseFloat(currentItem.Price);
      });
      return val;
  },
  },
});
