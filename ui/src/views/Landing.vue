<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Popular</h1>
      </b-col>
    </b-row>
    <b-row>
      <Listing v-for="(item, index) in items" :key="index" :item="item" :index="index" />
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetListing, IListing } from '../services/mock-data';
import Listing from '../components/Listing.vue';
import { getStoreItems, getItemDetails } from '../services/api-da';

export default Vue.extend({
  name: 'Landing',
  data() {
    return {
      loading: false,
      items: [] as IListing[]
    };
  },
  created() {
    this.getDataFromApi();
  },
  methods: {
    async getDataFromApi() {
      this.loading = true;

      // getStoreItems()
      //   .then((response) => {
      //     this.eBayFindResponse = response;
      //     // probably parse response
      //     // for each item in parsed reponse
      //     // call shopping api
      //     // this.loading = false;
      //     // this.items = response;
      //   })
      //   .catch((error) => {
      //     this.loading = false;
      //   });

      if(this.$store.state.initListings.length === 0) {
        debugger
        GetListing()
          .then((response: IListing[]) => {
            this.loading = false;
            this.items = response;
            this.$store.commit('addListings', response);
          })
          .catch((error) => {
            this.loading = false;
          });
        }
      else {
        this.items = this.$store.state.initListings;
      }  
    },
  },
  components: {
    Listing,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
