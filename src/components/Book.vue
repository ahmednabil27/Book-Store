<script setup>
import {books} from '@/books.js';

// let book = books[79];

let props = defineProps(['book'])

</script>

<template>
<div class="wrapper d-flex justify-content-center align-items-center">
    <div class="card mycard" style="width: 18rem;">
      <img :src="book.coverUrl" class="card-img-top" alt="...">
      <div class="card-body position-relative">
        <h5 class="card-title fw-bold">{{  book.title }}</h5>
        <p class="card-text text-muted desc mb-1">{{  book.description }}</p>
        <h6 class="published-year text-muted">published: {{  book.year }}</h6>
        <h6>Author : <span class="text-muted">Ahmed Nabil</span></h6>
        <div class="tags my-1">
            <div class="tag border border-info rounded-pill text-center " v-for="tag in book.tags"> {{ tag }}</div>
        </div>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
</div>

</template>

<style scoped>
.mycard {
    min-height: 550px;
}
.mycard a {
    bottom: 0px;
}
img {
    width: 100%;
    height: 150px;

}
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
    margin-right: 8px;
    padding: 0 5px;
}
.tag:hover {
    color: #fff;
    background-color: rgb(13, 202, 240);
}
.published-year {
    font-size: 15px;
}
</style>