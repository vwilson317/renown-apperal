<template>
  <b-col class="listing-item-container">
    <b-container>
      <b-img thumbnail fluid-grow class="banner-img" :src="item.ImageUrl" @click="itemClick(item)" />
    </b-container>
    <div>
      <a @click="addToCartClick(item)">
        <font-awesome-icon :icon="['far', 'plus-square']" size="2x"></font-awesome-icon>
      </a>
      <h6>{{shortenName(item.Name)}}</h6>
    </div>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { IListing } from "../services/mock-data";
import router from "../router";
import store from "../store";

const shortenName = (input: string): string => {
    let parts = input.split(" ");
    return [parts[0], parts[1], parts[2]].join(" ");
}

export default Vue.extend({
  name: "Listing",
  props: {
    item: { type: IListing }
  },
  data() {
    return {};
  },
  methods: {
    itemClick: (item: IListing): void => {
      router.push({ name: "detail", params: { item: item } });
    },
    addToCartClick: (item: IListing): void => {
      store.commit("addItemToCart", item);
    },
    shortenName
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.listing-item-container {
  a {
    position: absolute;
    right: 1em;
    bottom: -1.25em;

    transition: color 5ms;
    :hover {
      color: $red;
    }
  }
}

.banner-img {
  height: 15em;
  margin-top: 2em;

  :hover {
    cursor: pointer;
    transition-delay: s;
  }
}
</style>