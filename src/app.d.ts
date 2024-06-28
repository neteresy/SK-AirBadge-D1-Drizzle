declare global {
    namespace App {
      // interface Error {}
      // interface Locals {}
      // interface PageData {}
      interface Platform {
        env: {
          DB: D1Database;
        };
        context: {
          waitUntil(promise: Promise<any>): void;
        };
        caches: CacheStorage & { default: Cache };
      }
    }
  }
  
  export {};