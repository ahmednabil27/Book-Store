import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import { books } from "@/books";


export const useBookStore = defineStore("books", ()=>{
    // States
    let allBooks = ref(books);
    let relatedBooks= ref([]);
    // Computed
    let booksNumber = computed(()=>{
        return allBooks.value.length;
    })
    // Actions
    let getRelatedBooks = (book)=>{
        let result = allBooks.value.filter((b)=>{
            if(b['authorId'] === book['authorId'])
                return b;
            // if()
        });
        return result;
    };
    let randomBook = ()=>{
        return allBooks.value[(Math.floor(Math.random() * booksNumber))];
    }
    // there are more actions e.g getAllBooks, getBookById. but with server-json

    return {
        allBooks,
        relatedBooks,
        booksNumber,
        randomBook,
        getRelatedBooks
    };

})

