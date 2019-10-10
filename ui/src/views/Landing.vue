<template>
  <b-container>
    <b-row></b-row>
    <b-row algin-h="around">
      <b-col>
        <b-img
          thumbnail
          fluid
          class="banner-img"
          src="https://i.ebayimg.com/images/g/ogIAAOSwLPpdmlXS/s-l500.jpg"
        />
      </b-col>
      <b-col>
        <b-img
          thumbnail
          fluid
          class="banner-img"
          src="https://i.ebayimg.com/images/g/ogIAAOSwLPpdmlXS/s-l500.jpg"
        />
      </b-col>
      <b-col>
        <b-img
          thumbnail
          fluid
          class="banner-img"
          src="https://i.ebayimg.com/images/g/ogIAAOSwLPpdmlXS/s-l500.jpg"
        />
      </b-col>
      <b-col>
        <b-img
          thumbnail
          fluid
          class="banner-img"
          src="https://i.ebayimg.com/images/g/ogIAAOSwLPpdmlXS/s-l500.jpg"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Landing"
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
