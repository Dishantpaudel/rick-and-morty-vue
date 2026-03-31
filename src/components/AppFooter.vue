<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer glass-panel">
    <p class="footer-copy">
      Copyright {{ currentYear }} Rick and Morty Explorer
    </p>

    <nav class="footer-links" aria-label="Social links">
      <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"
        >LinkedIn</a
      >
      <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
    </nav>

    <p class="footer-credit">
      API Credits:
      <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
        The Rick and Morty API
      </a>
    </p>
  </footer>
</template>
