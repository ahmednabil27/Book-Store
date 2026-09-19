<script setup>
import BookInfoAccordion from '@/components/BookInfoAccordion.vue';
import BooksSection from '@/components/BooksSection.vue';
import HeroBook from '@/components/HeroBook.vue';
import { useBookStore } from '@/stores/bookStore';
import { storeToRefs } from 'pinia';
import { watchEffect, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const BookStore = useBookStore();
let route =  useRoute();
let related = ref([]);
const {allBooks} = storeToRefs (BookStore);
// const aBook = BookStore.randomBook();

// watch(
//     ()=> route.params.id,
//     ()=>{
//     let b = allBooks[+(route.params.id) -1];
//     related.value = BookStore.getRelatedBooks(b);
// }
// );

</script>

<template>
<div class="">
    <HeroBook :book="allBooks[(+route.params.id) -1]" />
    <BookInfoAccordion :book="allBooks[(+route.params.id) - 1]" />
    <BooksSection />
</div>

</template>

<style scoped>


</style>