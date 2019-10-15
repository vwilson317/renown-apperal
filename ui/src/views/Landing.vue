<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Popular</h1>
      </b-col>
    </b-row>
    <b-row>
      <Listing
        v-for="(item, index) in $store.state.listings"
        :key="index"
        :item="item"
        :index="index"
      />
      <b-button v-show="$store.state.listings.length < pageNum * 20" @click="getDataFromApi()">More</b-button>
      <h2 v-show="pageNum > 20">End Of Content</h2>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { GetListing, IListing } from "../business-logic/getListings";
import Listing from "../components/Listing.vue";
import { getListingItemsByStore } from "../services/api-da";

export default Vue.extend({
  name: "Landing",
  data() {
    return {
      loading: false,
      pageNum: 1 as number
    };
  },
  created() {
    this.getDataFromApi();
  },
  methods: {
    async getDataFromApi() {
      const pageNum = this.pageNum;
      const shouldLoadData = this.$store.state.listings.length < (pageNum * 20) &&
        this.$store.state.listings.length < 400;
      if (shouldLoadData) {
        const response = await GetListing(pageNum).then(response =>{
        this.$store.commit("addListings", response);
        this.pageNum += 1;
        })

        if (pageNum === 1) {
          this.$store.commit("setLoading", false);
        }
      }
    },
    scroll() { //not being called
      window.onscroll = async () => {
        let nearBottom =
          document.documentElement.scrollTop +
            document.documentElement.offsetHeight >
          document.documentElement.scrollHeight - 100;

          if (nearBottom) {
            await this.getDataFromApi();
          }
      };
    }
  },
  components: {
    Listing
  },
  mounted() {
    // todo: consider adding back when api limits are resolved
    // this.scroll();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
