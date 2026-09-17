<script setup>
import { authors } from "@/authors";
import { onMounted, ref } from "vue";

// let author = authors[1];
let parentDiv = ref(null);

let props = defineProps(['author'])
// onMounted(()=>{
    
//     let div = document.querySelector(".card");
//     div.addEventListener("click", function(){
//         let ele = document.querySelector(".card > div");
//         ele.classList.toggle("d-none");
//         let img = document.querySelector(".card > img");
//         img.classList.toggle("img");
//     })
// })

</script>

<template>
  <div class="wrapperr my-3 d-flex justify-content-center">
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
