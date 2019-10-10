<template>
  <div class="home">
    <Nav />
    <router-view />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Nav from '@/components/Nav.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Nav
  }
});

</script>
