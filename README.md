# Stencil Store Storage 

Stencil Store Storage is a simple way to keep a stencil store synced with either `localStorage` or `sessionStorage`.
You can also provide your own storage.
It just need to implement two methods:

1. `getItem(key: string): string | null`
2. `setItem(key: string, value: any): void`

## Install

```
npm install --save-dev stencil-store-storage
```

## Using it

```ts
import { createLocalStore } from 'stencil-store-storage';

export const values = createLocalStore('key-for-local-storage', {
  field: 'value',
  anotherField: Math.PI
});
```

If `createLocalStore` finds any value in `localStorage` for the given key,
those values will be automatically loaded. Any time a value is changed,
it will get synced to `localStorage`.

`createLocalStorage` can be passed an optional boolean as third-argument, in case
you want to listen for changes from other tabs. It defaults to `false`.

You can use `createSessionStore` the same way as `createLocalStore` with only two differences:

1. It will use `sessionStorage` instead of `localStorage`.
2. It does not get a third optional boolean value, and thus won't sync between
   tabs.

### Providing your own storage

You can use your own storage as long as it provides the two methods mentioned above. Assume we have a `cookie-jar` module that exposes a storage that keeps
our data in a cookie. We can use that with a stencil store just by:

```ts
import { cookieJar } from 'cookie-jar';
import { createStorageStore } from 'stencil-storage-store';

export const values = createStorageStore(cookieJar, 'key', {
  someField: 'some-value',
  someDifferentField: Math.E
});
```