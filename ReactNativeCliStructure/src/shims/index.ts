// Shims — polyfills and native module compatibility patches
// Import this file early in your app entry point if needed.

// Example: Polyfill global crypto for libraries that expect it in RN
if (typeof global.crypto === "undefined") {
  // @ts-ignore
  global.crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  };
}

export {};
