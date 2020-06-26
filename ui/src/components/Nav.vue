<template>
  <div class="nav" id="nav">
    <b-nav sticky class="navbar navbar-collapse" tabs align="center">
      <b-nav-item>
        <router-link to="/All">All</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/Mens">Mens</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/Womens">Womens</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/About">About</router-link>
      </b-nav-item>
      <form @submit="onSubmit" @reset="onReset">
        <b-nav-item @click="onSubmit">
          <font-awesome-icon :icon="['fas', 'search']" />
        </b-nav-item>

      </form>
    </b-nav>

            <div class="search-box">
          <b-form-input v-model="keywords" placeholder="Search..." />
        </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav",
  data: () => {
    return {
      keywords: "" as string
    };
  },
  methods: {
    onSubmit(event: any) {
      debugger
      if(event.keyCode === 13){

      }
      event.preventDefault();
      this.$store.commit("loading", true);
      this.$store.commit("setKeywords", this.keywords);
      this.$store.commit("search");
      this.$store.commit("increasePageNum");
      // this.onReset();
    }
  },
  updated() {
      this.$store.commit("loading", false);

  }
});
</script>

<style lang="scss">
@import "../styles/global.scss";

.navbar {
  background-color: $flash-white;
}

#nav {
  min-height: 3em;
  position: relative;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: $red;
    }
    font-size: 14px;
  }

  .nav-item {
    margin: 0 1em;
  }

  .search-box {
    position: absolute;
    right: 85px;
    top: 9px;
  }
}
</style>