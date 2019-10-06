<template>
  <div class ="nav" id="nav">
    <router-link to="/">Home</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  //@Prop() private msg!: string;
}
</script>

<style lang="scss">
.nav{
    border: 1px solid;
}
</style>