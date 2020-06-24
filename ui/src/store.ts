import Vue from 'vue';
import Vuex from 'vuex';
import { IListing, GetListings } from './business-logic/getListings';
import { setCartStatus } from './services/apiDataAccess';
import { Item } from './dto/findResponse';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartItems: [],
    listings: [],
    loading: { isLoading: true, position: 'top' },
    pageNum: 1,
    keywords: '',
  },
  mutations: {
    addItemToCart: async (state: any, item: IListing): Promise<void> => {
      state.cartItems.push(item);
      await setCartStatus(item.id, true);
    },
    addListings(state: any, listings: IListing[]) {
      state.listings.push(...listings);
    },
    replaceListings(state: any, listings: IListing[]) {
      state.listings = listings;
    },
    setLoading(state: any, isLoading: boolean) {
      state.loading.isLoading = isLoading;
    },
    increasePageNum(state: any) {
      state.pageNum += 1;
    },
    resetPageNum(state: any) {
      state.pageNum = 1;
    },
    removeListing(state: any, item: IListing) {
      const index = state.listings.indexOf(item);
      state.listings.splice(index, 1);
    },
    search: async (state: any) => {
      const result = await GetListings(1, state.keywords);
      state.listings = result;
    },
    setKeywords(state: any, keywords: string) {
      state.keywords = keywords;
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
      return val.toFixed(2);
    },
    removeItemFromCart: (state: any) => async (index: number) => {
      const removedItem = state.cartItems.splice(index, 1);
      await setCartStatus(removedItem[0].id, false);
      return removedItem;
    },
    getListing: (state: any) => (itemId: number) => {
      return state.listings.find((x: any) => x.id === itemId);
    },
  },
});
