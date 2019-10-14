import Vue from 'vue';
import Vuex from 'vuex';
import { IListing } from './business-logic/getListings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    listings: [],
    loading: true,
  },
  mutations: {
    addItemToCart(state: any, item: IListing) {
      state.cartItems.push(item);
    },
    addListings(state: any, listings: IListing[]) {
      state.listings.push(...listings);
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
