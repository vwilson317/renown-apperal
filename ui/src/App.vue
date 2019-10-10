<template>
  <div id="app">
    <b-row id="logo-row">
     <b-col offset="4">
        <router-link to="/">
          <img class alt="Vue logo" src="./assets/logo.png" />
        </router-link>
      </b-col>
      <b-col>
        <font-awesome-icon class="cart-icon" :icon="['fab', 'open-cart']" size="3x">
          <b-badge>1</b-badge>
        </font-awesome-icon>
      </b-col>
    </b-row>
    <Home /> 
  </div>
</template>

<script lang="ts">
import { GetDeals } from "./services/mock-data";
import Vue from "vue";
import Home from "@/views/Home.vue"; // @   is an alias to /src

const deals = GetDeals();

export default Vue.extend({
  name: "App",
  components: {
    Home
  }
});
</script>

<style lang='scss'>
@import "@/styles/global.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  height: 10vh;
  margin: 1vh;
}

.logo-row {
  background-color: $gun-metal;
}

.cart-icon {
  position: absolute;
  right: 2em;
  top: 1em;
  height: 3em;
  width: 3em;
  display: block;
  color: black;
  border: 1px solid blue;
}
</style>
