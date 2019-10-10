<template>
    <b-container>
        {{item.Name}}
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { IListing } from '../services/mock-data';

export default Vue.extend({
    name: 'Detail',
    props: ['item'],
    data(){
        return{
        }
    }
});
</script>