import { createStore } from "@stencil/store";
import { MinimumStorage } from "./types";

const safeRead = <T extends object>(
  storage: MinimumStorage,
  key: string
): T | null => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch {
    return null;
  }
};
export const createStorageStore = <T extends object>(
  storage: MinimumStorage,
  key: string,
  defaultValues: T,
  syncAcrossTabs = false
) => {
  const store = createStore(safeRead<T>(storage, key) ?? defaultValues);
  const write = () => storage.setItem(key, JSON.stringify(store.state));
  write();

  if (syncAcrossTabs) {
    window.addEventListener("storage", () => {
      const currentState = safeRead<T>(storage, key);

      if (currentState === null) {
        return;
      }

      for (const key in currentState) {
        store.set(key, currentState[key]);
      }
    });
  }

  store.use({ get: write, set: write, reset: write });
};

export const createLocalStore = <T extends object>(
  key: string,
  defaultValues: T
) => createStorageStore(localStorage, key, defaultValues);
export const createSessionStore = <T extends object>(
  key: string,
  defaultValues: T
) => createStorageStore(sessionStorage, key, defaultValues);
