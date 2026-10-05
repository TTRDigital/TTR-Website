import type Lenis from "lenis";

/** Shared handle to the Lenis instance so menus can pause scrolling. */
let instance: Lenis | null = null;

export const lenisStore = {
  set(lenis: Lenis | null) {
    instance = lenis;
  },
  get() {
    return instance;
  },
  stop() {
    instance?.stop();
  },
  start() {
    instance?.start();
  },
};
