<template>
  <b-container class="detail-container">
    <b-row align-h="center">
      <h5>{{item.Name}}</h5>
    </b-row>
    <div class="d-block d-sm-none"> 
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div v-for="currentImage in additionalImages" :key="currentImage" class="carousel-item active">
            <img class="d-block w-100" :src="currentImage" alt="First slide" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
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
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IListing } from '../business-logic/getListings';

export default Vue.extend({
  name: 'Detail',
  props: ['item'],
  data() {
    return {
      selectedImg: '' as string,
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
    },
  },
  methods: {
    changeMainPic(imgSrc: string) {
      this.selectedImg = imgSrc;
    },
  },
});
</script>

<style scoped lang="scss">
.detail-container {
  img {
    margin: 0;
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

  small {
  }

  .row {
    height: 25em;
  }

  margin: 0 0.2em;
}
</style>