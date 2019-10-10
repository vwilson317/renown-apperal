<template>
    <b-col @click="click">
        <b-img thumbnail fluid rounded="circle" class="banner-img" :src="item.ImageUrl" />
        <h5>{{item.Name}}</h5>
      </b-col>
</template>
<script lang="ts">
import {IListing} from '../services/mock-data';
import {Router} from '../router';

export default {
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
            this.$router.push('detail');//, {params: this.item});
        }
    }
}
</script>