<template>
    <b-col>
        <b-img thumbnail fluid rounded="circle" class="banner-img" :src="item.ImageUrl" />
        <h5>{{item.Name}}</h5>
      </b-col>
</template>
<script>
import {IListing} from '../services/mock-data';

export default {
    name: "Listing",
    props: {
        item: IListing
    },
    data(){
        return{

        }
    }
}
</script>