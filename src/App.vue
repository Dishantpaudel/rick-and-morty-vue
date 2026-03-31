<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import AppFooter from "./components/AppFooter.vue";
import AppNavbar from "./components/AppNavbar.vue";
import CharacterCard from "./components/CharacterCard.vue";
import EmptyState from "./components/EmptyState.vue";
import HeroSection from "./components/HeroSection.vue";
import SkeletonCard from "./components/SkeletonCard.vue";
import { fetchCharacterById, fetchCharacters } from "./services/rickAndMorty";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
  { label: "Unknown", value: "unknown" },
];

function parseRoute(hashValue) {
  const hash = hashValue?.replace(/^#/, "") || "/";

  if (hash === "/" || hash === "") {
    return { name: "home" };
  }

  if (hash === "/about") {
    return { name: "about" };
  }

  const detailMatch = hash.match(/^\/character\/(\d+)$/);
  if (detailMatch) {
    return { name: "character", id: detailMatch[1] };
  }

  return { name: "not-found" };
}

const currentRoute = ref(parseRoute(window.location.hash || "#/"));
const searchQuery = ref("");

const characters = ref([]);
const listLoading = ref(true);
const listError = ref("");
const debouncedQuery = ref("");
const statusFilter = ref("");
const page = ref(1);
const pageInfo = ref({
  count: 0,
  pages: 0,
  next: null,
  prev: null,
});
const requestVersion = ref(0);

const characterDetail = ref(null);
const detailLoading = ref(false);
const detailError = ref("");
const detailRequestVersion = ref(0);

let debounceHandle;
let hashListener;

watch(searchQuery, (value) => {
  if (currentRoute.value.name !== "home") {
    window.location.hash = "#/";
  }

  if (debounceHandle) {
    clearTimeout(debounceHandle);
  }

  debounceHandle = setTimeout(() => {
    debouncedQuery.value = value.trim();
  }, 300);
});

watch([debouncedQuery, statusFilter], () => {
  page.value = 1;
});

watch(
  [
    page,
    debouncedQuery,
    statusFilter,
    requestVersion,
    () => currentRoute.value.name,
  ],
  async (_, __, onCleanup) => {
    if (currentRoute.value.name !== "home") {
      return;
    }

    const controller = new AbortController();
    onCleanup(() => controller.abort());

    listLoading.value = true;
    listError.value = "";

    try {
      const data = await fetchCharacters({
        page: page.value,
        name: debouncedQuery.value,
        status: statusFilter.value,
        signal: controller.signal,
      });
      characters.value = data.results;
      pageInfo.value = data.info;
    } catch (fetchError) {
      if (fetchError?.name === "AbortError") {
        return;
      }
      listError.value = fetchError?.message || "Unable to load characters.";
    } finally {
      if (!controller.signal.aborted) {
        listLoading.value = false;
      }
    }
  },
  { immediate: true },
);

watch(
  [
    () => currentRoute.value.name,
    () => currentRoute.value.id,
    detailRequestVersion,
  ],
  async ([routeName, characterId], __, onCleanup) => {
    if (routeName !== "character" || !characterId) {
      characterDetail.value = null;
      detailError.value = "";
      detailLoading.value = false;
      return;
    }

    const controller = new AbortController();
    onCleanup(() => controller.abort());

    detailLoading.value = true;
    detailError.value = "";

    try {
      const data = await fetchCharacterById(characterId, {
        signal: controller.signal,
      });
      characterDetail.value = data;
    } catch (fetchError) {
      if (fetchError?.name === "AbortError") {
        return;
      }
      detailError.value =
        fetchError?.message || "Unable to load character details.";
    } finally {
      if (!controller.signal.aborted) {
        detailLoading.value = false;
      }
    }
  },
  { immediate: true },
);

onMounted(() => {
  const syncRoute = () => {
    currentRoute.value = parseRoute(window.location.hash || "#/");
  };

  if (!window.location.hash) {
    window.location.hash = "#/";
  }

  hashListener = syncRoute;
  syncRoute();
  window.addEventListener("hashchange", hashListener);
});

onBeforeUnmount(() => {
  if (debounceHandle) {
    clearTimeout(debounceHandle);
  }

  if (hashListener) {
    window.removeEventListener("hashchange", hashListener);
  }
});

const noResults = computed(
  () =>
    currentRoute.value.name === "home" &&
    !listLoading.value &&
    !listError.value &&
    characters.value.length === 0,
);
</script>

<template>
  <div class="app-shell">
    <AppNavbar v-model="searchQuery" />

    <main v-if="currentRoute.name === 'home'" class="page-main">
      <HeroSection />

      <section class="toolbar glass-panel">
        <div class="toolbar-left">
          <label for="status-filter" class="visually-hidden"
            >Filter by status</label
          >
          <select
            id="status-filter"
            v-model="statusFilter"
            class="status-select"
          >
            <option
              v-for="option in STATUS_OPTIONS"
              :key="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <p class="results-count">{{ pageInfo.count }} known characters</p>
      </section>

      <section
        v-if="listLoading"
        class="character-grid"
        aria-label="Loading characters"
      >
        <SkeletonCard v-for="index in 8" :key="index" />
      </section>

      <section
        v-else-if="listError"
        class="state-card glass-panel"
        role="alert"
      >
        <h2 class="state-title">Dimension Connection Failed</h2>
        <p>{{ listError }}</p>
        <button type="button" class="retry-button" @click="requestVersion += 1">
          Retry
        </button>
      </section>

      <section v-else-if="!noResults" class="character-grid">
        <CharacterCard
          v-for="(char, index) in characters"
          :key="char.id"
          :id="char.id"
          :name="char.name"
          :image="char.image"
          :status="char.status"
          :species="char.species"
          :origin="char.origin?.name"
          :priority="index < 4"
        />
      </section>

      <EmptyState v-else :query="searchQuery" />

      <nav
        v-if="!listLoading && !listError && pageInfo.pages > 1"
        class="pagination"
        aria-label="Character pages"
      >
        <button
          type="button"
          :disabled="!pageInfo.prev"
          @click="page = Math.max(1, page - 1)"
        >
          Previous
        </button>
        <span class="page-indicator"
          >Page {{ page }} of {{ pageInfo.pages }}</span
        >
        <button type="button" :disabled="!pageInfo.next" @click="page += 1">
          Next
        </button>
      </nav>
    </main>

    <main v-else-if="currentRoute.name === 'about'" class="page-main">
      <section class="info-panel glass-panel">
        <p class="hero-kicker">About This Project</p>
        <h1 class="hero-title">Production-grade Rick and Morty Explorer</h1>
        <p class="hero-description">
          This edition is built with Vue 3 Composition API, a custom
          glassmorphism design system, skeleton loading states, and route-level
          detail pages.
        </p>
        <p class="hero-description">
          Search in the navbar, filter by status, and open any character card to
          explore profile details.
        </p>
      </section>
    </main>

    <main v-else-if="currentRoute.name === 'character'" class="page-main">
      <div class="page-actions">
        <a href="#/" class="retry-button back-link">Back to Portal</a>
      </div>

      <section
        v-if="detailLoading"
        class="detail-card glass-panel detail-loading"
        aria-live="polite"
      >
        <div class="detail-image shimmer"></div>
        <div class="detail-content">
          <div class="skeleton-pill shimmer"></div>
          <div class="skeleton-line shimmer"></div>
          <div class="skeleton-line short shimmer"></div>
        </div>
      </section>

      <section
        v-else-if="detailError"
        class="state-card glass-panel"
        role="alert"
      >
        <h2 class="state-title">Character Signal Lost</h2>
        <p>{{ detailError }}</p>
        <button
          type="button"
          class="retry-button"
          @click="detailRequestVersion += 1"
        >
          Retry
        </button>
      </section>

      <section v-else-if="characterDetail" class="detail-card glass-panel">
        <img
          :src="characterDetail.image"
          :alt="characterDetail.name"
          width="300"
          height="300"
          class="detail-image"
          style="aspect-ratio: 1 / 1"
          loading="eager"
          fetchpriority="high"
        />

        <div class="detail-content">
          <span
            class="status-pill"
            :class="`status-${characterDetail.status.toLowerCase()}`"
          >
            <span class="status-dot"></span>
            {{ characterDetail.status }}
          </span>
          <h1 class="hero-title detail-title">{{ characterDetail.name }}</h1>
          <p class="hero-description">
            {{ characterDetail.species }} - {{ characterDetail.gender }}
          </p>

          <dl class="detail-grid">
            <div>
              <dt>Origin</dt>
              <dd>{{ characterDetail.origin?.name || "Unknown" }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ characterDetail.location?.name || "Unknown" }}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{{ characterDetail.type || "Unspecified" }}</dd>
            </div>
            <div>
              <dt>Episodes</dt>
              <dd>{{ characterDetail.episode?.length || 0 }}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>

    <main v-else class="page-main">
      <section class="state-card glass-panel">
        <h2 class="state-title">Page Not Found</h2>
        <p>This portal page does not exist in the current timeline.</p>
        <a href="#/" class="retry-button back-link">Go Home</a>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
