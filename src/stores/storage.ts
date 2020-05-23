import { createStore } from '@stencil/store';
import { MinimumStorage } from './types';

const safeRead = <T extends object>(storage: MinimumStorage, key: string): T | null => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch {
    return null;
  }
};

const debounce = fn => {
  let called = false;
  return () => {
    if (called) {
      return;
    }
    called = true;
    setTimeout(() => {
      fn();
      called = false;
    }, 0);
  };
};

export const createStorageStore = <T extends object>(
  storage: MinimumStorage,
  key: string,
  defaultValues: T,
  syncAcrossTabs = false
) => {
  const store = createStore(safeRead<T>(storage, key) ?? defaultValues);

  // Need to sync later or we would get ourselves in an infinite loop.
  const write = debounce(() => storage.setItem(key, JSON.stringify(store.state)));
  write();

  if (syncAcrossTabs) {
    window.addEventListener('storage', () => {
      const currentState = safeRead<T>(storage, key);

      if (currentState === null) {
        return;
      }

      for (const key in currentState) {
        store.set(key, currentState[key]);
      }
    });
  }

  store.use({ set: write, reset: write });

  return store;
};

export const createLocalStore = <T extends object>(
  key: string,
  defaultValues: T,
  syncAcrossTabs = false
) => createStorageStore(localStorage, key, defaultValues, syncAcrossTabs);
export const createSessionStore = <T extends object>(key: string, defaultValues: T) =>
  createStorageStore(sessionStorage, key, defaultValues);
