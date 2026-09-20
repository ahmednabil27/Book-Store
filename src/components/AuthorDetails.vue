<script setup>

import BooksSection from './BooksSection.vue';
import { useAuthorStore } from '@/stores/AuthorStore.js';
import { useBookStore } from '@/stores/bookStore.js';
import { useRoute } from 'vue-router';
import {ref, computed, watch} from 'vue'
import ChatBot from './ChatBot.vue';

let route = useRoute();

const {getAuthorById} = useAuthorStore();
let author = ref({});

watch(
    ()=> route.params.id,
    ()=>{
        author.value = getAuthorById(+route.params.id)
    },
    {immediate: true}
)

</script>

<template>
<div class="wrapper my-3">
    <h2>Author Details</h2>
    <div class="card mycard">
        <div class="inner-wrapper row justify-content-between align-items-center flex-column flex-sm-row">
            <div class="img-wrapper col-sm-3">
                <img :src="author.imageUrl" class="w-100"  alt="...">
            </div>
            <div class="card-body col-sm-7  text-center text-sm-start align-self-stretch">
              <h5 class="card-header mb-2 ps-0">{{  author.name }}</h5>
              <h6 class="card-title">{{  author.bio }}</h6>
              <q class="card-text text-muted desc mb-1 w-75 mx-auto mx-sm-0">{{  author.brief }}</q>
              <!-- <a href="#" class="btn btn-primary ">Go somewhere</a> -->
            </div>

        </div>
    </div>
    <div class="rel-books my-3">
        <BooksSection msg="Author's Work" :author/>
    </div>
    <ChatBot :author/>
</div>
</template>

<style scoped>
img {
    object-fit: contain;
}
.tag {
    padding: 3px;
    transition: .3s;
    cursor: pointer;
    width: fit-content;
    display: inline-block;
    margin-right: 8px;
    padding: 0 5px;
}
.tag:hover {
    color: #fff;
    background-color: rgb(13, 202, 240);
}

</style>