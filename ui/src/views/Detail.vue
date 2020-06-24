<template>
  <b-container class="detail-container">
    <b-row class="header d-block d-sm-none" align-h="center">
      <h3>{{item.Name}}</h3>
    </b-row>
    <b-row class="d-none d-sm-flex non-mobile-content" align-v="center" align-h="center" no-gutters>
      <b-col class="main-img" sm="6" no-gutters>
    <!-- directive -->
    <div class="images" v-viewer>
      <b-img :src="firstImageUrl" class="p2 img-item"/>
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in getAdditionalImages" :src="src" :key="src">
    </viewer>

      </b-col>
      <b-col sm="6" align-self="start">
        <div id="detail-info-container">
        <h3>{{item.Name}}</h3>
        <div class="divider"></div>
        <h5>${{item.Price}}</h5>
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
import Vue from 'vue';
import { IListing, GetListing } from '../business-logic/getListings';
import AddToCardButton from '../components/AddToCartButton.vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import store from '../store';
import { getItemDetails } from '../services/apiDataAccess';

Vue.use(Viewer);

export default Vue.extend({
  name: 'Detail',
  props: {
    id: String,
  },
  data() {
    return {
      selectedImg: '' as string,
      additionalImages: [] as string[],
      startIndex: 0,
      item: {} as IListing,
      firstImageUrl: '' as string,
    };
  },
  beforeMount() {
    // get image
    this.$store.commit('setLoading', true);
    this.item = store.getters.getListing(this.$props.id);
    if (this.item === undefined) {
      GetListing(this.$props.id).then((data: IListing) => {
        this.item = data;
        this.firstImageUrl = data.ImageUrls[0];
        this.$store.commit('setLoading', false);
      });
    } else {
      this.firstImageUrl = this.item.ImageUrls[0];
    }
    this.$store.commit('setLoading', false);
  },
  computed: {
    getAdditionalImages() {
      const copiedArray = [...this.item.ImageUrls] as string[];
      copiedArray.splice(2, 1);
      return copiedArray;
    },
    // firstImageUrl() {
    //   debugger
    //   return this.item.ImageUrls[0]
    // }
  },
  methods: {
    changeMainPic(imgSrc: string) {
      this.selectedImg = imgSrc;
    },
  },
  components: {
    AddToCardButton,
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

h4 {
  // color: $red
}

.detail-container {
  img-item {
    margin: 0;
    cursor: pointer;
    padding: 1em;
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
    padding-left: 2em;
}
</style>


