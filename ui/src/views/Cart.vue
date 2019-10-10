<template>
    <b-container>
        <b-row v-for="currentItem in cartItems" :key="currentItem.index">
            {{currentItem.Name}}
        </b-row>
        <b-row>
            {{total}}
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