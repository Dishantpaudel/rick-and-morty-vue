<script setup>
import { ref, onMounted, computed } from "vue";
import CharacterCard from "./components/CharacterCard.vue";
// import LoginView from './views/LoginView.vue' // Keep this if you want the login visible

const characters = ref([]);
const loading = ref(true);
const searchQuery = ref(""); // New: for search

const fetchCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    characters.value = data.results;
  } catch (error) {
    console.error("Error fetching Rick and Morty data:", error);
  } finally {
    loading.value = false;
  }
};

// New: Filtering logic that "stands out"
const filteredCharacters = computed(() => {
  return characters.value.filter((char) =>
    char.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div id="app">
    <header class="search-container">
      <h1>Rick and Morty</h1>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a character..."
        class="search-bar"
      />
    </header>

    <main id="center">
      <div v-if="loading" class="loading">
        <div class="counter">Loading the Multiverse...</div>
      </div>

      <div v-else class="character-grid">
        <CharacterCard
          v-for="char in filteredCharacters"
          :key="char.id"
          :name="char.name"
          :image="char.image"
          :status="char.status"
          :species="char.species"
          :origin="char.origin.name"
        />
      </div>

      <div v-if="filteredCharacters.length === 0 && !loading">
        <p>No characters found in this dimension.</p>
      </div>
    </main>

    <footer id="spacer">
      <div class="ticks"></div>
    </footer>
  </div>
</template>

<style>
/* LEAVE THIS EMPTY! 
  Make sure  main.js imports './style.css'
*/
</style>
