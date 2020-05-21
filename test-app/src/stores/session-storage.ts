import { crreateSessionStore } from 'stencil-store-storage';

export const local = crreateSessionStore('session-key', {
  aString: 'some-string',
  aNumber: 3.14,
});
