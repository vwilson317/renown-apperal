<template>
  <div id="app">
    <div class="sticky">
      <b-container fluid class="logo-row">
            <b-form @submit="onSubmit" @reset="onReset">

        <b-row cols="12">
          <b-col class="left-side" offset="2" offset-sm="1">
            <router-link to="/">
              <img class="logo" alt="Vue logo" src="./assets/logo-white.png" />
            </router-link>
          </b-col>
          <b-col cols="3" class="search-container">
              <b-row no-gutters align-h="center" align-v="center">
                <b-col cols="9">
                  <b-form-input v-model="keywords" placeholder="Search..." />
                </b-col>
                <b-col cols="3" class="search-button-container">
                  <b-button @click="onSubmit">
                    <font-awesome-icon :icon="['fas', 'search']" />
                  </b-button>
                </b-col>
              </b-row>
          </b-col>
          <b-col class="cart-action-container" cols="2" sm="1" align-self="center">
            <b-row align-h="center" align-v="center" @click="click">
              <span class="d-none d-sm-block">Cart</span>
              <font-awesome-icon class="cart-icon" :icon="['fab', 'opencart']" size="2x"></font-awesome-icon>
              <b-badge v-show="itemCount !== 0" class="item-count">{{itemCount}}</b-badge>
            </b-row>
          </b-col>
        </b-row>
            </b-form>

      </b-container>
      <Nav />
    </div>
    <div id="content-wrapper">
      <Loading v-show="loading()" />
      <b-container id="content">
        <div id="content-sub">
          <router-view />
        </div>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nav from '@/components/Nav.vue'; // @   is an alias to /src
import Loading from '@/components/Loading.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Nav,
    Loading,
  },
  data: () => {
    return {
      keywords: '',
    };
  },
  methods: {
    click() {
      this.$router.push('cart');
    },
    loading() {
      return this.$store.state.loading.isLoading;
    },
    onSubmit(event: any) {
      event.preventDefault();
      this.$store.commit('setKeywords', this.keywords);
      this.$store.commit('search');
      this.$store.commit('increasePageNum');
      //this.onReset();
    },
    // onReset: () => {
    //   this.keywords = '';
    // },
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

html {
  //overflow: hidden;
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
  color: $gun-metal;
  background-color: transparent;

  .btn-secondary {
    border-color: $red;
  }
}

@font-face {
  font-family: "bebas-neue";
  src: url("./assets/BebasNeue-Regular.woff") format("woff"),
    url("./assets/BebasNeue-Regular.woff2") format("woff2");
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "bebas-neue";
}

.btn-secondary {
  background-color: transparent !important;
  color: $gun-metal !important;
}

.btn-secondary:focus,
.btn-secondary:hover {
  -webkit-box-shadow: 0 0 5px 0.2rem $main;
  box-shadow: 0 0 5px 0.2rem $main;
  border: 0;
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

#content-wrapper {
  min-height: 35em;
  height: auto;
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
}

#content {
  margin-top: 8em;

  height: 100%;
  position: relative;
}

#content-sub {
  padding-top: 2em;
  margin-bottom: 2em;
  height: 100%;
}

.logo-row {
  background-color: $main; //$gun-metal;
  min-height: 4em;
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
  background-color: $red !important;
  opacity: 0.8;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

/* Add some top padding to the page content to prevent sudden quick movement (as the header gets a new position at the top of the page (position:fixed and top:0) */
.sticky + #content {
  padding-top: 8em;
}

.box-shadow {
  box-shadow: 4px 3px 3px grey;
}

.search-container {
  border-right: 1px solid white;

  .search-button-container {
    background-color: white;
  }
}
</style>
