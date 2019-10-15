<template>
  <b-col class="listing-item-container" cols="12" md="3">
    <div class="shine">
      <figure>
        <b-img
          fluid
          class="banner-img box-shadow"
          :src="item.ImageUrls[0]"
          @click="itemClick(item)"
        />
      </figure>
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
        <b-button :id="getTargetId" variant="link" @click="addToCartClick(item)">
          <font-awesome-icon :icon="['far', 'plus-square']" size="2x"></font-awesome-icon>
        </b-button>
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

/* Shine */
// figure {
//     width: 100%;
//     height: 100%;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
// }

// .shine {
// 	position: relative;
// }

// .shine figure::after {
// 	position: absolute;
// 	top: 0;
// 	left: -75%; 
// 	z-index: 2;
// 	display: block;
// 	content: '';
// 	width: 50%;
// 	height: 100%;
// 	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
// 	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
// 	-webkit-transform: skewX(-25deg);
// 	transform: skewX(-25deg);
// }

// .shine figure:hover::after {
// 	-webkit-animation: shine .75s;
// 	animation: shine .75s;
// }

/* Zoom In */
.shine img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}

.shine:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

@-webkit-keyframes shine {
  100% {
    left: 125%;
  }
}

@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>