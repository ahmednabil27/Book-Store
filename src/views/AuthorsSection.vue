<script setup>
import { authors } from '@/authors';
import Author from '@/components/Author.vue';

</script>

<template>
    <h2 class="mt-2">Authors</h2>
    <div class="wrapper dis-grid my-3">
        <Author v-for="author in authors" :author/>
    </div>
</template>

<style scoped>
.dis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
}
</style>
