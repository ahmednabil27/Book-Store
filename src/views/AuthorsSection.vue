<script setup>
import { authors } from '@/authors';
import Author from '@/components/Author.vue';
import { useAuthorStore } from '@/stores/AuthorStore';
import { storeToRefs } from 'pinia';

const authorStore = useAuthorStore();
const {allAuthors} = storeToRefs(authorStore);

</script>

<template>
    <h2 class="mt-2">Authors</h2>
    <div class="wrapper dis-grid my-3">
        <Author v-for="author in allAuthors" :author/>
    </div>
</template>

<style scoped>
.dis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
}
</style>
