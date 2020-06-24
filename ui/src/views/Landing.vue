<template>
  <div id="landing-container">
    <b-row>
      <b-col>
        <h1>Popular</h1>
      </b-col>
    </b-row>
    <b-row class="justify-content-center" >
      <Listing
        v-for="(item, index) in $store.state.listings"
        :key="index"
        :item="item"
        :index="index"
      />
    </b-row>
    <b-row
      class="more-container"
      v-show="showMore"
      align-h="center"
      align-v="center"
      align-content="center"
    >
      <b-col cols="4" align-self="center">
        <b-button class="more-btn" @click="moreClick()">More</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetListings, IListing } from '../business-logic/getListings';
import Listing from '../components/Listing.vue';
import { getListingItemsByStore } from '../services/apiDataAccess';

export default Vue.extend({
  name: 'Landing',
  data() {
    return {
      // loading: false
    };
  },
  methods: {
    async getDataFromApi(pageNum: number) {
        GetListings(pageNum, this.$store.state.keywords).then((response) => {
          this.$store.commit('addListings', response);
          this.$store.commit('increasePageNum');
        });

    },
    getPageNum() {
      return this.$store.state.pageNum;
    },
    showMore() {
      const shouldShow = this.$store.state.listings.length !== 0 &&
        this.$store.state.listings.length ===
        (this.getPageNum() + this.$store.state.cartItems.length) * process.env.VUE_APP_PAGE_SIZE;
      return shouldShow;
    },
    async moreClick() {
      const pageNum = this.getPageNum();
      this.$store.commit('setLoading', true);
      this.getDataFromApi(pageNum).then(() => {
        this.$store.commit('setLoading', false);
      });
    },
  },
  components: {
    Listing,
  },
  // created(){
  //   this.$store.commit('setLoading', true);
  // },
  beforeMount(){
    this.$store.commit('setLoading', true);
      this.getDataFromApi(1).then(() => {
      // this.$store.commit('setLoading', false);
      //         setTimeout(() => {

      // }, 1500);
    });
  },
  updated(){
      this.$store.commit('setLoading', false);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/global.scss";

h3 {
  margin: 40px 0 0;
}

#landing-container {
  height: 100%;
}

.more-container {
  margin: 3em 0;

  .more-btn {
    width: 100%;
  }

}
</style>
