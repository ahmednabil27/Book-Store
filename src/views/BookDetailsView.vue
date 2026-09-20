<script setup>
import BookInfoAccordion from '@/components/BookInfoAccordion.vue';
import BooksSection from '@/components/BooksSection.vue';
import HeroBook from '@/components/HeroBook.vue';
import ChatBot from '@/components/ChatBot.vue';
import { useBookStore } from '@/stores/bookStore';
import { storeToRefs } from 'pinia';
import { watchEffect, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useAuthorStore } from '@/stores/AuthorStore';

const BookStore = useBookStore();
const authorStore = useAuthorStore();

let route =  useRoute();
let related = ref([]);
let author = ref({});
let b = ref({})
const {allBooks} = storeToRefs (BookStore);

// const bookAuthor = computed(()=>{
//     return authorStore.getAuthorById(b.authorId).name;
// })
// const aBook = BookStore.randomBook();

watch(
    ()=> route.params.id,
    ()=>{
    b = allBooks.value[+(route.params.id) -1];
    related.value = BookStore.getAuthorBooks(b.authorId);
    author = authorStore.getAuthorById(b.authorId);
},
{immediate: true}
);

</script>

<template>
<div class="">
    <HeroBook :book="b" />
    <BookInfoAccordion :book="b" :author/>
    <!-- <BooksSection  msg="Authors Books" :render-authro="true"/> -->
    <BooksSection :tags="b.tags" msg="Related Books" :render-authro="false"/>
    <ChatBot :author :book="b"/>

</div>

</template>

<style scoped>


</style>