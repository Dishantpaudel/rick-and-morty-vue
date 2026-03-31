<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <header class="navbar glass-panel">
    <a href="#/" class="brand" aria-label="Go to home">
      <span class="brand-mark" aria-hidden="true">O</span>
      <span class="brand-text">Rick and Morty Nexus</span>
    </a>

    <div class="search-shell">
      <label for="global-search" class="visually-hidden"
        >Search characters</label
      >
      <span class="search-icon" aria-hidden="true">/</span>
      <input
        id="global-search"
        type="search"
        class="nav-search"
        :value="modelValue"
        placeholder="Search the multiverse..."
        autocomplete="off"
        @input="handleInput"
      />
    </div>
  </header>
</template>
