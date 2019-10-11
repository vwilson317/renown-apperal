<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Most Viewed</h1>
      </b-col>
    </b-row>
    <b-row>
      <Listing v-for="item in items" :key="item.index" :item="item"/>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { GetListing, IListing } from '../services/mock-data';
import Listing from '../components/Listing.vue';

export default Vue.extend({
  name: 'Landing',
  data() {
    return {
      loading: false,
      items: [] as IListing[],
    };
  },
  created() {
    this.getDataFromApi();
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      GetListing()
        .then((response: IListing[]) => {
          this.loading = false;
          this.items = response;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
      // axios.get('/youApiUrl')
      // .then(response => {
      //     this.loading = false
      //     this.rows = response.data
      // })
      // .catch(error => {
      //     this.loading = false
      //     console.log(error)
      // })
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
