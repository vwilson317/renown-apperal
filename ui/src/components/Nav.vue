<template>
  <div class="nav" id="nav">
    <b-nav sticky="" class="navbar navbar-collapse" tabs align="center">
      <b-nav-item>
        <router-link to="/All" @click="setKeywords()">All</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/Mens" @click="setKeywords('men')">Mens</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/Womens" @click="setKeywords('women')">Womens</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/About" >About</router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Nav',
  methods: {
    setKeywords(keyword?: string){
      this.$store.commit('setKeywords', keyword);
    }
  }
});
</script>

<style lang="scss">
@import "../styles/global.scss";

.navbar {
  background-color: $flash-white;
}

#nav {
  min-height: 4em;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: $red;
    }
  }

  .nav-item {
    margin: 0 1em;
  }
}
</style>