<template>
  <div id="app">
    <div id="logo-row">
      <router-link to="/">
        <img class alt="Vue logo" src="./assets/logo.png" />
      </router-link>
    </div>
    <Home />
  </div>
</template>

<script lang="ts">
import {GetDeals} from './services/mock-data';
import Vue from 'vue';
import Home from '@/views/Home.vue'; // @   is an alias to /src

const deals = GetDeals();

export default Vue.extend({
    name: 'App',
    components: {
      Home,
  },
});
</script>

<style lang='scss'>
@import '@/styles/global.scss';

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

.logo-row{
  background-color: $gun-metal;
}
</style>
