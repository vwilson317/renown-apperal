<template>
<div class="container">
  <img class="banner-img" src="https://i.ebayimg.com/images/g/ogIAAOSwLPpdmlXS/s-l500.jpg"/>
  <!-- <img class="banner-img" src="../assets/s-l500.jpg"/> -->
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Landing',
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
.banner-img {
  height: 35vh;
  width: 20%;
  margin-top: 2em;
}
</style>
