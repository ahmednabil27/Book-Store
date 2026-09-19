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
          <!-- This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer. -->
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
</style>
