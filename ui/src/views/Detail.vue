<template>
  <b-container class="detail-container">
    <b-row class="header d-block d-sm-none" align-h="center">
      <h3>{{item.Name}}</h3>
    </b-row>

    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      controls
      img-height="480"
      class="d-block d-sm-none"
    >
      <b-carousel-slide v-for="currentImage in item.ImageUrls" :key="currentImage.index">
        <template v-slot:img>
          <img class="d-block img-fluid w-100" height="480" :src="currentImage" alt="image slot" />
        </template>
      </b-carousel-slide>
    </b-carousel>

    <b-row class="d-none d-sm-flex non-mobile-content" align-v="center" align-h="center" no-gutters>
      <b-col class="main-img" sm="6" no-gutters>
        <b-img 
        v-for="currentImage in item.ImageUrls" :key="currentImage.index"
        class="box-shadow" fluid :src="currentImage" />
      </b-col>
      <b-col sm="6" align-self="start">
        <div id="detail-info-container">
        <h3>{{item.Name}}</h3>
        <AddToCardButton :item="item" />
        </div>
      </b-col>
    </b-row>

    <b-row class="d-block d-sm-none" align-v="center" align-h="center">
      <b-col align-self="center">
    <AddToCardButton  :item="item" />
      </b-col>
    </b-row>
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
      selectedImg: "" as string,
      additionalImages: [] as string[],
      startIndex: 0
    };
  },
  beforeMount() {
    this.selectedImg = this.$props.item.ImageUrls[0];
    this.additionalImages = this.getAdditionalImages();
    this.$store.commit("setLoading", true);

    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 1000);
  },
  computed: {},
  methods: {
    changeMainPic(imgSrc: string) {
      this.selectedImg = imgSrc;
    },
    getAdditionalImages() {
      const copiedArray = [...this.item.ImageUrls];
      copiedArray.splice(1, 0);
      return copiedArray;
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

  .header {
    margin-bottom: 2em;
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
    height: 3em;
    transition: ease-in;
  }

  .row {
    height: 25em;
  }

  margin: 0 0.2em;
}

#carousel-fade {
}

// .carousel-control-prev span::before {
//     // background-image: url();
//     content: '<i class="fas fa-chevron-left"></i>';
//     display: block;
//     height: 3em;
// }

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none;
  font-size: 55px;
  color: $red;
  position: relative;

  span {
    position: relative;
  }
}

.carousel-control-next-icon:before,
.carousel-control-prev-icon:before {
  position: absolute;
  top: -0.5em;
  left: -5px;
  font-family: monospace;
}

.carousel-control-next-icon:before {
  content: ">";
}

.carousel-control-prev-icon:before {
  content: "<";
}

#my-modal {
  height: 80em;
}

#detail-info-container {
    position: fixed;
    top: 8.5em;
    padding-top: 4em;
    margin-top: 6em;
    width: 40%;
}
</style>