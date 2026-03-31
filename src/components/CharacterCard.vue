<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Unknown",
  },
  species: {
    type: String,
    default: "Unknown species",
  },
  origin: {
    type: String,
    default: "Unknown origin",
  },
  priority: {
    type: Boolean,
    default: false,
  },
});

const normalizedStatus = computed(() => props.status.toLowerCase());
const statusClass = computed(() => {
  if (normalizedStatus.value === "alive") {
    return "status-alive";
  }

  if (normalizedStatus.value === "dead") {
    return "status-dead";
  }

  return "status-unknown";
});
</script>

<template>
  <a
    :href="`#/character/${id}`"
    class="character-link"
    :aria-label="`Open details for ${name}`"
  >
    <article class="character-card glass-panel">
      <img
        :src="image"
        :alt="name"
        width="300"
        height="300"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
        style="aspect-ratio: 1 / 1; width: 100%; height: auto"
      />
      <div class="card-body">
        <span class="status-pill" :class="statusClass">
          <span class="status-dot"></span>
          {{ status }}
        </span>
        <h2 class="card-title">{{ name }}</h2>
        <p class="card-meta">{{ species }}</p>
        <p class="card-origin">{{ origin }}</p>
      </div>
    </article>
  </a>
</template>
