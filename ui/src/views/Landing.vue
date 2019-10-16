<template>
  <div id="landing-container">
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
import Vue from "vue";
import { GetListing, IListing } from "../business-logic/getListings";
import Listing from "../components/Listing.vue";
import { getListingItemsByStore } from "../services/apiDataAccess";

export default Vue.extend({
  name: "Landing",
  data() {
    return {
      //loading: false
    };
  },
  created() {
    let i = 1;
    for (; i <= 5; i++) {
      // preload 100 items
      this.getDataFromApi(i);
    }
  },
  methods: {
    async getDataFromApi(pageNum: number) {
      const shouldLoadData =
        this.$store.state.listings.length <= pageNum * 20 &&
        this.$store.state.listings.length < 400;
      if (shouldLoadData) {
        const response = await GetListing(pageNum).then(response => {
          this.$store.commit("addListings", response);
          this.$store.commit("increasePageNum");
        });
      }
    },
    getPageNum() {
      return this.$store.state.pageNum;
    },
    showMore() {
      return (
        this.$store.state.listings.length !== 0 &&
        this.$store.state.listings.length <= this.getPageNum() * 20
      );
    },
    moreClick() {
      const pageNum = this.getPageNum();
      this.$store.commit("setLoading", true);
      this.getDataFromApi(pageNum).then(() =>{
        this.$store.commit("setLoading", false);
      })
    },
    scroll() {
      // not being called
      window.onscroll = async () => {
        const nearBottom =
          document.documentElement.scrollTop +
            document.documentElement.offsetHeight >
          document.documentElement.scrollHeight - 100;

        if (nearBottom) {
          await this.getDataFromApi(1);
        }
      };
    }
  },
  components: {
    Listing
  },
  mounted() {
    // todo: consider adding back when api limits are resolved
    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 1500);
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
    background-color: transparent !important;
    color: $gun-metal !important;
  }

  .more-btn:focus,
  .more-btn:hover {
    -webkit-box-shadow: 0 0 5px 0.2rem $main;
    box-shadow: 0 0 5px 0.2rem $main;
    border: 0;
  }
}
</style>
