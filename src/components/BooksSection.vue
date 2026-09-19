<script setup>
import { books } from "@/books";
import Book from "@/components/Book.vue";
import { useBookStore } from "@/stores/bookStore";
import { storeToRefs } from "pinia";
import { ref, watchEffect, watch, computed } from "vue";

// let msg = "Books of ";
let numberOfShowedBooks = ref(8);
const props = defineProps({
    msg: String,
    tags: Array,
    renderAuthro: Boolean,
    author: Object
});


const bookStore = useBookStore();
let { getRelatedBooks } = bookStore;

let related = ref([]);



// const relatedBooks = computed(() => {

//     if (!props.tags || props.tags.length === 0) {
//         return [];
//     }

//     return props.tags.flatMap(tag => {
//         return bookStore.getRelatedBooks(tag);
//     });

// });
const relatedBooks = computed(() => {

  // --------------------------------
  // Case 1: Tags exist
  // --------------------------------
  if (props.tags && props.tags.length > 0) {

    return props.tags.flatMap(tag => {
      return bookStore.getRelatedBooks(tag);
    });

  }


  // --------------------------------
  // Case 2: Author exists
  // --------------------------------
  if (props.author) {

    return bookStore.getAuthorBooks(props.author.id);

  }


  // --------------------------------
  // Case 3: Nothing specified
  // --------------------------------

  // Return some books as default
  return bookStore.allBooks.slice(0);
});

const authorWork = computed(()=>{
    
})

function showMoreBooks(){
    if(relatedBooks.value.length > numberOfShowedBooks.value)
        numberOfShowedBooks.value += 8;

}

// watch(
//   () => tags.value,
//   () => {
//     if (tags.value !== "none") {
//         related.value = [];
//       for (let i = 0; i < tags.value.length; ++i) {
//         related.value.push(...getRelatedBooks(tags.value[i]));
//       }
//     }
//   },
//   {deep: true}
// );
</script>

<template>
    <!-- <h1>{{  props.tags }}</h1> -->
  <div class="row my-3 justify-content-center align-items-center row-gap-3">
    <h2 class="mb-0">{{ msg }}</h2>
    <!-- <Book  class="col-sm-6 col-md-4 col-lg-3" v-for="book in numberOfShowedBooks" :book="relatedBooks[book - 1]"/> -->
    <Book
      v-for="book in relatedBooks.slice(0, numberOfShowedBooks)"
      :key="book.id"
      :book="book"
      class="col-sm-6 col-md-4 col-lg-3"
    />
    <h1>Count is {{ relatedBooks.length }}</h1>
    <button @click="showMoreBooks" :disabled="numberOfShowedBooks === relatedBooks.length" class="btn btn-primary w-25">Load More</button>
  </div>
</template>

<style scoped></style>
