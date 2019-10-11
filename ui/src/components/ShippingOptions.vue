<template>
  <div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="same-address" :checked="enabled" @click="clickfunc"/>
      <label
        class="custom-control-label"
        for="same-address"
      >Shipping address is the same as my billing address</label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="save-info" />
      <label class="custom-control-label" for="save-info">Save this information for next time</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Minicart',
    props: ['enabled', 'clickfunc'],
    computed: {
    },
});
</script>