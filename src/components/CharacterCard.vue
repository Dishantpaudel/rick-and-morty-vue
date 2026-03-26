<script setup>
defineProps({
  name: String,
  image: String,
  status: String,
  species: String,
  origin: String
})
</script>

<template>
  <div class="card">
    <img :src="image" :alt="name" />
    <div class="card-info">
      <span class="status-badge">{{ status }}</span>
      <h2>{{ name }}</h2>
      <p>{{ species }} from {{ origin }}</p>
    </div>
  </div>
</template>