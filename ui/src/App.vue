<template>
  <div id="app">
    <b-row class="logo-row">
      <b-col offset="4">
        <router-link to="/">
          <img class alt="Vue logo" src="./assets/logo.png" />
        </router-link>
      </b-col>
      <b-col class="cart-container">
        <div @click="click">
          <font-awesome-icon class="cart-icon" :icon="['fab', 'opencart']" size="2x"></font-awesome-icon>
          <b-badge class="item-count">{{itemCount}}</b-badge>
        </div>
      </b-col>
    </b-row>
    <Home />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Home from "@/views/Home.vue"; // @   is an alias to /src


export default Vue.extend({
  name: "App",
  components: {
    Home
  },
  data(){
    return {
    }
  },
  methods:{
    click(){
      const item = {Name: 'Test'};
      this.$router.push({name: 'detail', params: {item: item}});
    }
  },
  computed:{
    itemCount(){
      return this.$store.state.cartItems.length;
    }
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
}

.cart-container {
  text-align: right;
}
.cart-icon {
  display: inline-block;
  color: black;
    margin-top: .5em;
    margin-right: 0.5em;
}

.item-count {
  position: absolute;
  bottom: 15px;
  right: 25px;
}

.badge-secondary {
  background-color: $red;
  opacity: 0.8;
}
</style>
