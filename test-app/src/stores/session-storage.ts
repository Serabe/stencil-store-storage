import { createSessionStore } from 'stencil-store-storage';

export const key = 'session-key';
export const defaultValues = {
  aString: 'some-string',
  aNumber: 3.14,
};
export const session = createSessionStore(key, defaultValues);
