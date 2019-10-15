<template>
  <div id="app">
    <div class="sticky">
    <b-container fluid class="logo-row">
      <b-row cols="12">
        <b-col class="left-side" offset="2" offset-sm="1">
          <router-link to="/">
            <img class="logo" alt="Vue logo" src="./assets/logo-white.png" />
          </router-link>
        </b-col>
        <b-col class="cart-action-container" cols="2" sm="1" align-self="center">
          <b-row align-h="center" align-v="center" @click="click">
            <span>Cart</span>
            <font-awesome-icon class="cart-icon" :icon="['fab', 'opencart']" size="2x"></font-awesome-icon>
            <b-badge v-show="itemCount !== 0" class="item-count">{{itemCount}}</b-badge>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <Nav />
    </div>
    <div id="content">
      <Loading v-show="loading()" />
      <div id="content-sub">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Nav from "@/components/Nav.vue"; // @   is an alias to /src
import Loading from "@/components/Loading.vue";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
    Loading
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$router.push("cart");
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  computed: {
    itemCount() {
      return this.$store.state.cartItems.length;
    }
  }
});
</script>

<style lang='scss'>
@import "@/styles/global.scss";

html {
  //overflow: hidden;
  height: 100%;
  -ms-overflow-style: none; // IE 10+
  overflow: -moz-scrollbars-none; // Firefox

  ::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
}

body {
  height: 100%;
}

button {
  :hover {
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
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;
}

#content-sub {
  padding-top: 2em;
  margin-bottom: 2em;
  height: 100%;
}

.logo-row {
  background-color: #5F699B;//$gun-metal;
  min-height: 4em;
  .left-side {
    border-right: 1px solid white;
  }
}

.logo {
  height: 4em;
  padding: 0.25em;
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

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

/* Add some top padding to the page content to prevent sudden quick movement (as the header gets a new position at the top of the page (position:fixed and top:0) */
.sticky + #content {
  padding-top: 102px;
}
</style>
