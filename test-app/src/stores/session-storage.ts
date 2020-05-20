import { crreateSessionStore } from "stencil-storage-store";

export const local = crreateSessionStore("session-key", {
  aString: "some-string",
  aNumber: 3.14
});
