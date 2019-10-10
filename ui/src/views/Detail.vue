<template>
    <b-container>
        {{item.Name}}
    </b-container>
</template>

<script lang="ts">
import {IListing} from '../services/mock-data';

export default {
    name: 'Detail',
    // props: {
    //     item: IListing
    // },
    data(){
        return{

        }
    }
}
</script>