import type { RouteLocation } from "vue-router";
import { joinURL } from "ufo";
import { useRouter } from "vue-router";

export function useChunkPreloadErrorHandling() {
  const router = useRouter();

  const chunkErrors = new Set<Error>();
  router.beforeEach(() => {
    chunkErrors.clear();
  });

  function reloadAppAtPath(to: RouteLocation) {
    const path = joinURL(import.meta.env.VITE_APP_BASE_SUFFIX, to.fullPath);
    if (globalThis.location.pathname !== path) {
      globalThis.location.href = path;
    } else {
      globalThis.location.reload();
    }
  }

  window.addEventListener("vite:preloadError", event => {
    chunkErrors.add(event.payload);
  });

  if (import.meta.env.PROD) {
    router.onError((error, to) => {
      if (chunkErrors.has(error)) {
        reloadAppAtPath(to);
      }
    });
  }
}
