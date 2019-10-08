<template>
  <div class="home">
    <Nav />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Nav from "@/components/Nav.vue";

@Component({
  components: {
    HelloWorld,
    Nav
  }
})
export default class Home extends Vue {}
</script>
