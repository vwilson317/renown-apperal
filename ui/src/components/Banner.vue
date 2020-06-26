<template>
  <b-container fluid class="logo-row">
    <b-container>
        <b-row no-gutters class="container">
          <b-col class="left-side">
            <router-link to="/">
              <img class="logo" alt="Vue logo" src="../assets/logo-white.png" />
            </router-link>
          </b-col>
        </b-row>
       <div class="cart">
          <b-col class="cart-action-container">
            <b-row align-h="center" align-v="center" @click="click">
              <!-- <span class="d-none d-sm-block">Cart</span> -->
              <font-awesome-icon class="cart-icon" :icon="['fab', 'opencart']" size="2x"></font-awesome-icon>
              <b-badge v-show="itemCount !== 0" class="item-count">{{itemCount}}</b-badge>
            </b-row>
          </b-col>
        </div> 
    </b-container>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Banner",
  components: {},
  data: () => {
    return {
      keywords: ""
    };
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      this.$store.commit("setKeywords", this.keywords);
      this.$store.commit("search");
      this.$store.commit("increasePageNum");
      // this.onReset();
    },
    onReset() {
      this.keywords = "";
    },
    click() {
      this.$router.push('cart');
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

.box-shadow {
  box-shadow: 4px 3px 3px grey;
}

.search-container {
  border-right: 1px solid white;
  border: 1px solid white;

  .search-button-container {
    background-color: white;
  }
}

.temp-border {
  border: 2px solid black;
}

.cart {
    position: absolute;
    right: 30px;
    top: 12px;
}
</style>
