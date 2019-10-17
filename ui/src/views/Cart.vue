<template>
  <b-container class="cart-container">
    <b-row v-show="noItemsInCart">
      <b-col>No items in cart</b-col>
    </b-row>
    <b-row
      align-v="start"
      v-for="(currentItem, index) in cartItems"
      :key="index"
      class="cart-item-row box-shadow"
    >
      <b-col cols="5" sm="3">
        <b-img thumbnail :src="currentItem.ImageUrls[0]" />
      </b-col>
      <b-col cols="7" sm="3">{{currentItem.Name}}</b-col>
      <b-col cols="6" sm="3">{{currentItem.Price}}</b-col>
      <b-col cols="6" sm="3">
        <b-button variant="link" @click="remove(index)">
          <font-awesome-icon :icon="['far', 'minus-square']" size="2x"></font-awesome-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-row cols="12" v-show="!noItemsInCart">
        <b-col>
            Total: {{total}}
        </b-col>
        <b-col>
            <b-button @click="checkout"> 
              Checkout
            </b-button>
        </b-col>
        </b-row>
  </b-container>
</template>

<script lang="ts">
import { IListing } from '../business-logic/getListings';
import store from '../store';
import router from '../router';

export default {
  name: 'Cart',
  props: {},
  data() {
    return {
      currentCartItems: [],
    };
  },
  computed: {
    cartItems() {
      return store.state.cartItems;
    },
    total() {
      return store.getters.total;
    },
    noItemsInCart() {
      return store.state.cartItems.length === 0;
    },
  },
  methods: {
    remove(index: number) {
      let item: IListing[] = store.getters.removeItemFromCart(index);
      store.commit('addListings', item);
    },
    checkout() {
        router.push('checkout');
    },
  },
};
</script>

<style lang="scss">
.cart-container {
  img {
    height: 5em;
  }

  .cart-item-row {
    margin-bottom: 1em;
    background-color: white;
    padding: .5em 0;

  }
}
</style>