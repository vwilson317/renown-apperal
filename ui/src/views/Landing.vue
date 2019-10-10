<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Most Viewed</h1>
      </b-col>
    </b-row>
    <b-row algin-h="around">
      <b-col v-for="item in items" :key="item.index">
        <b-img thumbnail fluid rounded="circle" class="banner-img" :src="item.ImageUrl" />
        <h5>{{item.Name}}</h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { GetListing, IListing } from "../services/mock-data";

export default Vue.extend({
  name: "Landing",
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
    getDataFromApi() {
      this.loading = true;
      GetListing()
        .then((response: IListing[]) => {
          this.loading = false;
          this.items = response;
        })
        .catch(error => {
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
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.banner-img {
  height: 35vh;
  width: 100%;
  margin-top: 2em;
}
</style>
