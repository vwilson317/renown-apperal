<template>
  <b-container class="detail-container">
    <b-row align-h="center" align-v="center">
      <b-col class="main-img" cols="4">
        <b-img thumbnail fluid :src="selectedImg" />
      </b-col>
      <b-col class="addition-images-col" cols="2">
        <b-row  align-v="center">
          <b-col>
            <b-img
              fluid-grow
              thumbnail
              v-for="currentImage in additionalImages.slice(1,3)"
              :src="currentImage"
              :key="currentImage.index"
              @mouseenter="changeMainPic(currentImage)"
              @mouseleave="changeMainPic(item.ImageUrls[0])"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col class="addition-images-col" cols="1">
        <b-row align-v="center">
          <b-col>
            <b-img
              fluid-grow
              thumbnail
              v-for="currentImage in additionalImages.slice(3)"
              :src="currentImage"
              :key="currentImage.index"
              @mouseenter="changeMainPic(currentImage)"
              @mouseleave="changeMainPic(item.ImageUrls[0])"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <h5>{{item.Name}}</h5>
      </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { IListing } from "../services/mock-data";

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
  }
});
</script>

<style scoped lang="scss">
.detail-container {
  img {
    margin: 0;
  }

  .row{
    height: 25em;
  }
}

.main-img {
  // height: 100%;
}

.addition-images-col {
  img {
    padding-bottom: 0.5em;
  }
}
</style>