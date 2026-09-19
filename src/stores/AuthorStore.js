import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authors } from "@/authors";

export const useAuthorStore = defineStore("authors", () => {

  // =========================
  // State
  // =========================

  const allAuthors = ref(authors);


  // =========================
  // Getters
  // =========================

  const authorsNumber = computed(() => {
    return allAuthors.value.length;
  });


  // =========================
  // Actions
  // =========================

  // Get one author by ID
  const getAuthorById = (id) => {
    return allAuthors.value.find(
      author => author.id === Number(id)
    );
  };


  // Get authors whose name matches a search
  const searchAuthors = (query) => {
    const search = query.toLowerCase().trim();

    return allAuthors.value.filter(author =>
      author.name.toLowerCase().includes(search)
    );
  };


  // Get a random author
  const randomAuthor = () => {
    if (allAuthors.value.length === 0) {
      return null;
    }

    const index = Math.floor(
      Math.random() * allAuthors.value.length
    );

    return allAuthors.value[index];
  };


  // Add a new author
  const addAuthor = (author) => {
    allAuthors.value.push({
      ...author,
      id: Date.now()
    });
  };


  // Update an author
  const updateAuthor = (id, updatedData) => {
    const index = allAuthors.value.findIndex(
      author => author.id === Number(id)
    );

    if (index === -1) return false;

    allAuthors.value[index] = {
      ...allAuthors.value[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };

    return true;
  };


  // Delete an author
  const deleteAuthor = (id) => {
    const index = allAuthors.value.findIndex(
      author => author.id === Number(id)
    );

    if (index === -1) return false;

    allAuthors.value.splice(index, 1);

    return true;
  };


  return {
    // State
    allAuthors,

    // Getters
    authorsNumber,

    // Actions
    getAuthorById,
    searchAuthors,
    randomAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
  };
});