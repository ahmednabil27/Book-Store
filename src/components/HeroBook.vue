<script setup>
import { books } from "@/books";
import { authors } from "@/authors.js";
import BookInfoAccordion from "./BookInfoAccordion.vue";
import BooksSection from "./BooksSection.vue";
import { useAuthorStore } from "@/stores/AuthorStore.js";
import { computed } from "vue";

let props = defineProps(['book']);

let author = computed(()=>{
  return useAuthorStore().getAuthorById(props.book.authorId);
})

</script>

<template>
  <div class="wrapper my-3">
    <div class="card mycard">
      <div
        class="inner-wrapper row justify-content-between align-items-center flex-column flex-sm-row"
      >
        <div class="img-wrapper col-sm-4">
          <img :src="book.coverUrl" class="w-100" alt="..." />
        </div>
        <div
          class="card-body col-sm-7 text-center align-self-start text-sm-start"
        >
          <h4 class="card-title fw-bold">{{ book.title }}</h4>
          <p class="card-text text-muted desc mb-1 mx-auto">
            {{ book.description }}
          </p>
          <h6 class="published-year text-muted">published: {{ book.year }}</h6>
          <h6>Author : <span class="text-muted">{{author.name}}</span></h6>
          <div class="tags my-1">
            <div
              class="tag border border-info rounded-pill text-center"
              v-for="tag in book.tags"
            >
              {{ tag }}
            </div>
          </div>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: contain;
}
.tag {
  padding: 3px;
  transition: 0.3s;
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
