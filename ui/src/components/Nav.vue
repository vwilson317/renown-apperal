<template>
    <div class="nav" id="nav">
      <b-nav class="nav-bar" tabs align="center">
        <b-nav-item>
          <router-link to="/Mens">Mens</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/Womens">Womens</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/About">About</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/All">All</router-link>
        </b-nav-item>
      </b-nav>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Nav',
});
</script>

<style lang="scss">
@import '../styles/global.scss';

.nav-bar{
  width: 100%;
  background-color: $flash-white;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: $red;
    }
  }

  margin-bottom: 2em;

}
</style>