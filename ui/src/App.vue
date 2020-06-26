<template>
  <div id="app">
    <div class="sticky">
      <Banner />
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
import Vue from "vue";
import Nav from "@/components/Nav.vue"; // @   is an alias to /src
import Loading from "@/components/Loading.vue";
import { GetListings } from "./business-logic/getListings";
import Banner from "./components/Banner.vue";

export default Vue.extend({
  name: "App",
  components: {
    Nav,
    Loading,
    Banner
  },
  data: () => {
    return {
      keywords: ""
    };
  },
  methods: {
    loading() {
      return this.$store.state.loading.isLoading;
    },
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
</style>
