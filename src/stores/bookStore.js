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
    let getRelatedBooks = (tag)=>{
        return allBooks.value.filter(book => book.tags.includes(tag));
    };
    let randomBook = ()=>{
        return allBooks.value[(Math.floor(Math.random() * booksNumber.value))];
    }
    let getAuthorBooks = (id)=>{
        return allBooks.value.filter(b => b.authorId === id);
    }

    // there are more actions e.g getAllBooks, getBookById. but with server-json

    return {
        allBooks,
        relatedBooks,
        booksNumber,
        randomBook,
        getAuthorBooks,
        getRelatedBooks
    };

})

