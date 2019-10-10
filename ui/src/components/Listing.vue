<template>
  <b-col class="listing-item-container" >
    <b-img thumbnail fluid rounded="circle" class="banner-img" :src="item.ImageUrl" @click="itemClick(item)"/>
    <h5>{{item.Name}}</h5>
    <a @click="addToCartClick(item)"> 
      <font-awesome-icon :icon="['far', 'plus-square']" size="2x"></font-awesome-icon>
    </a>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { IListing } from "../services/mock-data";
import router from "../router";
import store from "../store";

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
    }
  }
});
</script>

<style scoped lang="scss">
.listing-item-container {
}
</style>