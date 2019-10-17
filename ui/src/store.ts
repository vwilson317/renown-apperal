import Vue from 'vue';
import Vuex from 'vuex';
import { IListing } from './business-logic/getListings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    listings: [],
    loading: {isLoading: true, position: 'top'},
    pageNum: 1,
  },
  mutations: {
    addItemToCart(state: any, item: IListing) {
      state.cartItems.push(item);
    },
    addListings(state: any, listings: IListing[]) {
      state.listings.push(...listings);
    },
    setLoading(state: any, isLoading: boolean) {
      state.loading.isLoading = isLoading;
    },
    increasePageNum(state: any) {
      state.pageNum += 1;
    },
    removeListing(state: any, item: IListing) {
      const index = state.listings.indexOf(item);
      state.listings.splice(index, 1);
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
  removeItemFromCart: (state: any) => (index: number) => {
    return state.cartItems.splice(index, 1);
  },
  },
});
