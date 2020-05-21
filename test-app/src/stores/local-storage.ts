import { createLocalStore } from 'stencil-store-storage';

export const key = 'local-key';
export const defaultValues = {
  aString: 'some-string',
  aNumber: 3.14,
};
export const local = createLocalStore(key, defaultValues);
