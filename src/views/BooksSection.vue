<script setup>
import { books } from '@/books';
import Book from '@/components/Book.vue';
</script>

<template>

<div class="row justify-content-center align-items-center row-gap-3" >
    <Book  class="col-sm-6 col-md-4 col-lg-3" v-for="book in 88" :book="books[book]"/>
</div>

</template>

<style scoped>

</style>