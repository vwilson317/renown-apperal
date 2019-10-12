<template>
  <div id="app">
    <b-container fluid class="logo-row">
      <b-row cols="12">
        <b-col class="left-side" offset="2" offset-sm="1">
          <router-link to="/">
            <img class="logo" alt="Vue logo" src="./assets/logo.png" />
          </router-link>
        </b-col>
        <b-col class="cart-action-container" cols="2" col-sm="1" align-self="center">
          <b-row align-h="center" align-v="center" @click="click">
            <span>Cart</span>
            <font-awesome-icon class="cart-icon" :icon="['fab', 'opencart']" size="2x"></font-awesome-icon>
          <b-badge v-show="itemCount !== 0" class="item-count">{{itemCount}}</b-badge>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <Nav />
    <div id="content">
    <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nav from '@/components/Nav.vue'; // @   is an alias to /src

export default Vue.extend({
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$router.push('cart');
    },
  },
  computed: {
    itemCount() {
      return this.$store.state.cartItems.length;
    },
  },
});
</script>

<style lang='scss'>
@import "@/styles/global.scss";

html{
  //overflow: hidden;
  height: 100%;
      -ms-overflow-style: none;  // IE 10+
    overflow: -moz-scrollbars-none;  // Firefox

    ::-webkit-scrollbar {
    display: none; // Safari and Chrome
}
}

body{
  height: 100%;
}

button {
  :hover{
    color: $red;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2em;
  height: 100%;
}

#content {
  padding-top: 2em;
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  margin-bottom: 2em;
}

.logo-row {
  background-color: $gun-metal;
  min-height: 4em;
  .left-side {
    border-right: 1px solid white;
  }
}

.logo {
  height: 4em;
  padding: .25em;
  background-color: white;
}

.cart-action-container {
  text-align: right;
  color: white;

  .cart-icon {
  display: inline-block;
}
}

.item-count {
  position: absolute;
  top: 15px;
  right: 10px;
}

.badge-secondary {
  background-color: $red;
  opacity: 0.8;
}
</style>
