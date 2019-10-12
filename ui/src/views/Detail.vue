<template>
  <b-container class="detail-container">
    <b-row align-h="center">
      <div class="main-img">
        <b-img fluid :src="mainImg" />
      </div>
      <b-col class="addition-images-col" cols="1">
        <b-row align-h="start">
          <b-img fluid
            v-for="currentImage in additionalImages"
            :src="currentImage"
            :key="currentImage.index"
            @mouseenter="changeMainPic(currentImage)"
            @mouseleave="changeMainPic(item.ImageUrl)"
          />
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="center">{{item.Name}}</b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IListing } from '../services/mock-data';

export default Vue.extend({
  name: 'Detail',
  props: ['item'],
  data() {
    return {
      additionalImages: [
        'https://i.ebayimg.com/thumbs/images/g/9s0AAOSwURhdmlXN/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/g/nXAAAOSwA5RdmlXO/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/g/IAYAAOSw1EZdn8Pp/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/g/1swAAOSwSChdn8PJ/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/g/BHsAAOSwxjxdn8S1/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/g/7QEAAOSwEYBdn8Py/s-l225.webp',
        'https://i.ebayimg.com/thumbs/images/m/m-20LBx8QHXqGehfzKduUEA/s-l225.jpg',
      ],
      mainImg: '' as string,
    };
  },
  beforeMount() {
    this.mainImg = this.$props.item.ImageUrl;
  },
  methods: {
    changeMainPic(imgSrc: string) {
      this.mainImg = imgSrc;
    },
  },
});
</script>

<style scoped lang="scss">
.detail-container{
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
    padding-bottom: .5em;
  }
}
</style>