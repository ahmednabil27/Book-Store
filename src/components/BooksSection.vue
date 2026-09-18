<script setup>
import { books } from '@/books';
import Book from '@/components/Book.vue';
</script>

<template>


<div class="row my-3 justify-content-center align-items-center row-gap-3" >
    <h2>Related Books</h2>
    <Book  class="col-sm-6 col-md-4 col-lg-3" v-for="book in 8" :book="books[book]"/>
    <button class="btn btn-primary w-25">Load More</button>
</div>

</template>

<style scoped>

</style>