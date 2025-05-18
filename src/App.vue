<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useChunkPreloadErrorHandling } from './chunk-reload';
import { ref } from 'vue';

const withErrorHandling = ref(false);

// useChunkPreloadErrorHandling();
// withErrorHandling.value = true;
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/todos">
        Todo List <template v-if="withErrorHandling">
          (with chunk preload error handling)
        </template>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  padding: 2rem;
}

nav {
  max-width: 1280px;
  margin: 0 auto;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.2rem;
}

nav a:hover {
  color: #42b883;
}

nav a.router-link-exact-active {
  color: #42b883;
}
</style>
