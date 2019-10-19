<template>
  <b-row align-v="center" align-h="center">
    <b-button v-show="isSmall" variant="link" @click="addToCartClick(item)">
      <font-awesome-icon :icon="['far', 'plus-square']" size="2x"></font-awesome-icon>
    </b-button>
    <b-col cols="8" align-self="center">
      <b-button 
      :disabled="isInCart(item)"
      class="small-add-btn"
       v-show="!isSmall" 
       @click="addToCartClick(item, true)">Add To Cart</b-button>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { IListing } from '../business-logic/getListings';
import store from '../store';
import router from '../router';

export default Vue.extend({
  name: 'AddToCartButton',
  props: {
    isSmall: Boolean,
    item: {},
  },
  methods: {
    addToCartClick: (item: IListing, goToCart?: boolean): void => {
      store.commit('removeListing', item);
      store.commit('addItemToCart', item);
      if (goToCart) {
        router.push('cart');
      }
    },
    isInCart(item: IListing) {
      const inCart = store.state.cartItems.includes(item);
      return inCart;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.listing-item-container {
  button {
    position: absolute;
    right: 1em;
    top: -4em;
    color: $red;
    opacity: 0.6;
  }

  .btn-link:hover {
    color: $red;
    opacity: 1;
  }

  button:hover {
    opacity: 1;
  }

  .detail-col {
    // border-top: 2px solid $red;
  }
}

.small-add-btn {
  width: 100%;
  margin: 2em 0;
}
</style>