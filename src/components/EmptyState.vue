<script setup>
defineProps({
  query: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="empty-state glass-panel">
    <svg
      class="empty-icon"
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="60" cy="60" r="46" class="portal-ring" />
      <circle cx="60" cy="60" r="26" class="portal-core" />
    </svg>
    <h3>No characters found in this dimension</h3>
    <p v-if="query">
      No match for "{{ query }}". Try a different keyword or status filter.
    </p>
    <p v-else>Try a different status filter and search again.</p>
  </section>
</template>
