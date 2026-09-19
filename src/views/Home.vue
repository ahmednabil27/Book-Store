<script setup>
import BooksSection from '@/components/BooksSection.vue';
import HeroBook from '@/components/HeroBook.vue';
import { useBookStore } from '@/stores/bookStore';
import { ref } from 'vue';

const bookStore = useBookStore();
const {randomBook} = bookStore;

const book = ref(randomBook());

</script>

<template>
    <div class="my-3">
        <HeroBook :book />
        <BooksSection msg="Popular Books"  />
    </div>

</template>

<style scoped>

</style>