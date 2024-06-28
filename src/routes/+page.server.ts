// import { drizzle } from 'drizzle-orm/d1';
// import type { PageServerLoad } from './$types';
// import { users } from '$lib/schema';

// export const load = (async ({ platform }) => {
//   const DB = platform?.env.DB;
//   if (!DB) {
//     throw new Error('Invalid DB');
//   }
//   const db = drizzle(DB);
//   const result = await db.select().from(users).all();
//   console.log(result); // Debug: log fetched users
//   return { result: result };
// }) satisfies PageServerLoad;