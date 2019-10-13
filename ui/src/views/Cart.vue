<template>
  <b-container class="cart-container">
    <b-row v-show="noItemsInCart">
      <b-col>No items in cart</b-col>
    </b-row>
    <b-row
      cols="12"
      align-v="start"
      v-for="(currentItem, index) in cartItems"
      :key="index"
      class="cart-item-row"
    >
      <b-col>
        <b-img thumbnail :src="currentItem.ImageUrls[0]" />
      </b-col>
      <b-col>{{currentItem.Name}}</b-col>
      <b-col>{{currentItem.Price}}</b-col>
      <b-col>
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
import { IListing } from '../services/mock-data';
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
      store.state.cartItems.splice(index, 1);
      // store.replaceState({ cartItems: this.cartItems });
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
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    margin-bottom: 1em;
  }
}
</style>