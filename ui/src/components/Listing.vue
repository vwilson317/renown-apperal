<template>
  <b-col class="listing-item-container" cols="12" md="3">
    <div>
      <b-img thumbnail fluid class="banner-img" :src="item.ImageUrls[0]" @click="itemClick(item)" />

      <!-- <b-popover
          :target="getTargetId"
          placement="rightbottom"
          title="Add item to cart"
          triggers="hover focus"
      ></b-popover>-->
    </div>
    <div class="detail-container">
      <b-row align-content="center">
      <b-row>
          <h5>{{shortenName(item.Name)}}</h5>
          <h5>${{item.Price}}</h5>
        </b-row>
        <b-col>
          <b-button :id="getTargetId" variant="link" @click="addToCartClick(item)">
            <font-awesome-icon :icon="['far', 'plus-square']" size="2x"></font-awesome-icon>
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { IListing } from "../business-logic/getListings";
import router from "../router";
import store from "../store";

const getTargetId = (obj: any): string => {
  return "popover-" + obj.index;
};

const shortenName = (input: string): string => {
  const parts = input.split(" ");
  return [parts[0], parts[1], parts[2]].join(" ");
};

export default Vue.extend({
  name: "Listing",
  props: ["item", "index"],
  data() {
    return {};
  },
  methods: {
    itemClick: (item: any): void => {
      router.push({ name: "detail", params: { item } });
    },
    addToCartClick: (item: IListing): void => {
      store.commit("addItemToCart", item);
    },
    shortenName,
    getTargetId
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.listing-item-container {
  button {
    position: absolute;
    right: 1em;
    bottom: -1.25em;
    color: $gun-metal;
  }

  a {
    // transition: color 5ms;
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

  .detail-container {
    border: 2px solid black;
  }
}
</style>