<script setup>
import { ref, onMounted } from "vue";

// Reactive state to hold our data
const characters = ref([]);
const loading = ref(true);

// Function to fetch data from the API
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

// Run the fetch when the component "mounts" (loads)
onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <main>
    <h1>Rick and Morty (Vue Version)</h1>

    <div v-if="loading" class="loading">Loading characters...</div>

    <div v-else class="character-grid">
      <div v-for="char in characters" :key="char.id" class="card">
        <img :src="char.image" :alt="char.name" />
        <h3>{{ char.name }}</h3>
        <p>{{ char.status }} - {{ char.species }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #242424;
  color: white;
  min-height: 100vh;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  background: #333;
}

.card img {
  width: 100%;
  border-radius: 4px;
}
</style>
