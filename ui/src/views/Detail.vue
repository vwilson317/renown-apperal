<template>
  <b-container class="detail-container">
    <b-row align-h="center">
      <div class="main-img">
        <b-img fluid :src="selectedImg" />
      </div>
      <b-col class="addition-images-col" cols="1">
        <b-row align-h="start">
          <b-img
            fluid
            v-for="currentImage in additionalImages"
            :src="currentImage"
            :key="currentImage.index"
            @mouseenter="changeMainPic(currentImage)"
            @mouseleave="changeMainPic(item.ImageUrls[0])"
          />
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="center">{{item.Name}}</b-row>
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
      selectedImg: "" as string,
    };
  },
  beforeMount() {
    this.selectedImg = this.$props.item.ImageUrls[0];
  },
  computed:{
    additionalImages(){
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
}

.main-img {
  height: 25em;
  width: 25em;
  border: 1px solid black;
  margin-right: 1em;
}

.addition-images-col {
  border: 1px solid black;

  img {
    width: 100%;
    padding-bottom: 0.5em;
  }
}
</style>