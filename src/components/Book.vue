<script setup>
import {books} from '@/books.js';
import { computed } from 'vue';
import { useAuthorStore } from '@/stores/AuthorStore';
// let book = books[79];

let {getAuthorById} = useAuthorStore();

let props = defineProps(['book'])

let author = computed(()=>{
    return getAuthorById(props.book.authorId);
})

</script>

<template>
<div class="book-wrapper d-flex justify-content-center align-items-center">
    <RouterLink :to="'/books/'+book['id']" class="text-decoration-none">
    <div class="card mycard" style="width: 18rem;">
      <img :src="book.coverUrl" class="card-img-top" alt="...">
            <div class="card-img-overlay mcard text-white">

                <div class="card-body position-relative">
                  <h5 class="card-title fw-bold">{{  book.title }}</h5>
                  <p class="card-text  desc mb-1">{{  book.description }}</p>
                  <h6 class="published-year ">published: {{  book.year }}</h6>
                  <h6>Author : <span class="">{{author.name}}</span></h6>
                  <div class="tags my-1">
                      <div class="tag  rounded-pill text-center bg-success" v-for="tag in book.tags"> {{ tag }}</div>
                  </div>
                  <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
            </div>
    </div>
    </RouterLink>
</div>

</template>

<style scoped>
.mycard {
    min-height: 450px;
    transition: .3s;
}
.mycard:hover {
    transform: translateY(-4px);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .12);
}
.mycard a {
    bottom: 0px;
}
/* img {
    width: 100%;
    height: 150px;

} */
.desc {
    line-height: 1.3;
}
h6 span {
    font-size: 14px;
}

.tag {
    padding: 3px;
    transition: .3s;
    cursor: pointer;
    width: fit-content;
    display: inline-block;
    margin:5px;
    padding: 0 8px;
}
/* .tag:hover {
    color: #fff;
    background-color: rgb(13, 202, 240);
} */
.published-year {
    font-size: 15px;
}
.mcard {
    transition: .4s;
    display: none;
}
.book-wrapper:hover .mcard {
    display: block;
}
img {
    object-fit: contain;
}
.book-wrapper:hover img {
    filter: brightness(20%);
}
</style>

<!-- 

<script setup>
import { authors } from "@/authors";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useBookStore } from "@/stores/bookStore";
import { computed, onMounted, ref } from "vue";

let props = defineProps(['author']);


</script>

<template>
  <div class="wrapperr my-3 d-flex justify-content-center">
    <RouterLink :to="'/authors/'+author.id"> 
      <div class="card text-bg-dark">
      <img :src="author.imageUrl" class="card-img" alt="..." />
      <div class="card-img-overlay mcard">
        <h5 class="card-title">{{  author.name }}</h5>
        <p class="card-text">
            <p>{{ author.bio }}</p>
        </p>
        <p class="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  </RouterLink>
  </div>
</template>

<style scoped>
.wrapperr {
    height: 250px;
    overflow: hidden;
}
.mcard {
    transition: .4s;
    display: none;
}
.wrapperr:hover .mcard {
    display: block;
}
img {
    object-fit: contain;
}
.wrapperr:hover img {
    filter: brightness(50%);
}
</style> -->
