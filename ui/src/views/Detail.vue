<template>
  <b-container class="detail-container">
    <b-row align-h="center">
      <h3>{{item.Name}}</h3>
    </b-row>

    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      controls
      img-height="480"
    >
      <b-carousel-slide
        v-for="currentImage in item.ImageUrls"
        :key="currentImage.index"
        class="d-block d-sm-none"
      >
        <template v-slot:img>
          <img class="d-block img-fluid w-100" height="480" :src="currentImage" alt="image slot" />
        </template>
      </b-carousel-slide>
    </b-carousel>

    <b-row class="d-none d-sm-block" align-h="center" align-v="center" no-gutters>
      <b-col class="main-img" cols="12" sm="5" align-self="center">
        <b-img thumbnail fluid :src="selectedImg" />
      </b-col>
      <b-col class="addition-images-col" cols="4" sm="2">
        <b-img
          fluid-grow
          v-for="currentImage in additionalImages.slice(1,3)"
          :src="currentImage"
          :key="currentImage.index"
          @mouseenter="changeMainPic(currentImage)"
          @mouseleave="changeMainPic(item.ImageUrls[0])"
        />
      </b-col>
      <b-col class="addition-images-col" cols="4" sm="1">
        <b-img
          fluid-grow
          v-for="currentImage in additionalImages.slice(3,7)"
          :src="currentImage"
          :key="currentImage.index"
          @mouseenter="changeMainPic(currentImage)"
          @mouseleave="changeMainPic(item.ImageUrls[0])"
        />
      </b-col>
      <b-col class="addition-images-col" cols="4" sm="1">
        <b-img
          fluid-grow
          v-for="currentImage in additionalImages.slice(7,11)"
          :src="currentImage"
          :key="currentImage.index"
          @mouseenter="changeMainPic(currentImage)"
          @mouseleave="changeMainPic(item.ImageUrls[0])"
        />
      </b-col>
    </b-row>

    <AddToCardButton :item="item" />
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { IListing } from "../business-logic/getListings";
import AddToCardButton from "../components/AddToCartButton.vue";

export default Vue.extend({
  name: "Detail",
  props: ["item"],
  data() {
    return {
      selectedImg: "" as string
    };
  },
  beforeMount() {
    this.selectedImg = this.$props.item.ImageUrls[0];
  },
  computed: {
    additionalImages() {
      const copiedArray = [...this.item.ImageUrls];
      copiedArray.splice(1, 0);
      return copiedArray;
    }
  },
  methods: {
    changeMainPic(imgSrc: string) {
      this.selectedImg = imgSrc;
    }
  },
  components: {
    AddToCardButton
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.detail-container {
  img {
    margin: 0;
  }

  .carousel-indicators li {
    color: $red;
    opacity: 0.6;
  }
}

.main-img {
  // height: 100%;
}

.addition-images-col {
  img {
    padding-bottom: 0.5em;
    height: 7em;
  }

  .row {
    height: 25em;
  }

  margin: 0 0.2em;
}

#carousel-fade {
  margin-top: 2em;
}
</style>