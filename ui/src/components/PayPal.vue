<template>
  <div id="paypal-button-container"></div>
</template>

<script lang="ts">
export default {
  name: "Paypal",
  methods: {
    createOrder(data: any, actions: any) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: this.$store.getters.total,
            },
          }
        ]
      });
    },
    onApprove: function(data: any, actions: any) {
      return actions.order.capture().then((details: any) => {
        alert(
          "Transaction completed by " + details.payer.name.given_name + "!"
        );
      });
    },
    renderButton() {
        paypal.Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "paypal"
          },
          createOrder: this.createOrder,
          onApprove: this.onApprove
        })
        .render("#paypal-button-container");
    }
  },
  mounted() {
    this.renderButton()
  }
};
</script>

