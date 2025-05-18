import { joinURL } from "ufo";
import type { RouteLocation } from "vue-router";
import { useRouter } from "vue-router";

export function useChunkPreloadErrorHandling() {
  const router = useRouter();

  const chunkErrors = new Set<Error>();
  window.addEventListener("vite:preloadError", event => {
    chunkErrors.add(event.payload);
  });

  router.onError((error, to) => {
    if (chunkErrors.has(error)) {
      reloadAppAtPath(to);
    }
  });

  function reloadAppAtPath(to: RouteLocation) {
    const path = joinURL(import.meta.env.VITE_APP_BASE_SUFFIX, to.fullPath);
    window.location.href = path;
  }
}
