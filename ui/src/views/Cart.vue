<template>
    <b-container class="cart-container">
        <b-row cols="12" align-v="start" v-for="currentItem in cartItems" :key="currentItem.index" class="cart-item-row">
            <b-col>
                <b-img thumbnail :src="currentItem.ImageUrl"/>
            </b-col>
            {{currentItem.Name}}
        </b-row>
        <b-row cols="12">
            Total: {{total}}
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { IListing } from '../services/mock-data';
import store from '../store';

export default {
    name: 'Cart',
    props: {
    },
    data(){
        return{
            currentCardItems: []
        }
    },
    computed:{
        cartItems(){
            return store.state.cartItems;;
        },
        total(){
            return store.getters.total;
        }
    }
}
</script>

<style lang="scss">
.cart-container{
    img {
        height: 5em;
    }

    .cart-item-row{
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        margin-bottom: 1em;
    }
}
</style>