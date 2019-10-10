<template>
    <b-col @click="click">
        <b-img thumbnail fluid rounded="circle" class="banner-img" :src="item.ImageUrl" />
        <h5>{{item.Name}}</h5>
      </b-col>
</template>

<script lang="ts">
import Vue from 'vue';
import {IListing} from '../services/mock-data';
import router from '../router'

export default Vue.extend({
    name: 'Listing',
    props: {
        item: IListing
    },
    data(){
        return{

        }
    },
    methods: {
        click: (): void => {
            router.push({name: 'detail', params: {item: this.item}});
        }
    }
});
</script>