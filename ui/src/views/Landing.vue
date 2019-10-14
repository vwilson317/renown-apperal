<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Popular</h1>
      </b-col>
    </b-row>
    <b-row>
      <Listing v-for="(item, index) in items" :key="index" :item="item" :index="index" />
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
      items: [] as IListing[],
      pageNum: 1 as number
    };
  },
  created() {
    this.getDataFromApi();
  },
  methods: {
    async getDataFromApi() {
      if (this.pageNum <= 20) {
        const response = await GetListing(this.pageNum);
        this.$store.commit("addListings", response);
        this.items = this.$store.state.listings;
        if (this.pageNum === 1) {
          this.$store.commit("setLoading", false);
        }
        this.pageNum += 1;
      } else {
        this.items = this.$store.state.listings;
      }
    },
    scroll() {
      window.onscroll = () => {
        let nearBottom =
          document.documentElement.scrollTop +
            document.documentElement.offsetHeight >
          document.documentElement.scrollHeight - 100;

        if (nearBottom) {
          this.getDataFromApi();
        }
      };
    }
  },
  components: {
    Listing
  },
  mounted() {
    this.scroll();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
