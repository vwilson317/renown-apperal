<template>
  <div class="container">
    <div class="row">
      <Minicart />
      <div class="col-md-8 order-md-1">
        <form class="needs-validation" novalidate>
          <CustomerInfo />

          <hr class="mb-4" />

          <h4 class="mb-3">Billing address</h4>
          <Address />

          <hr class="mb-4" />
          <ShippingOptions :enabled="{enabled}" :clickfunc="toggleEnabled"/>
          <div v-show="!enabled">
            <hr class="mb-4" />
            <h4 class="mb-3">Shipping address</h4>
            <Address />
          </div>

          <hr class="mb-4" />
          <Payment />
          <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Minicart from '../components/MiniCart.vue';
import CustomerInfo from '../components/CustomerInfo.vue';
import Address from '../components/Address.vue';
import ShippingOptions from '../components/ShippingOptions.vue';
import Payment from '../components/Payment.vue';

export default Vue.extend({
  name: 'Checkout',
  components: {
    Minicart,
    CustomerInfo,
    Address,
    ShippingOptions,
    Payment,
  },
  data() {
    return {
      enabled: true,
    };
  },
  methods: {
    toggleEnabled() {
      this.enabled = !this.enabled;
    },
  },
});
</script>

<style import="./form-validation.css"/>
