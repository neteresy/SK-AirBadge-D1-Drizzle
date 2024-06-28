import { SvelteKitAuth } from "@auth/sveltekit";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "@auth/sveltekit/providers/github";
import { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';

import { drizzle } from 'drizzle-orm/d1';
import { users, accounts, sessions, verificationTokens } from '$lib/schema';

export function createClient(db: D1Database) {
  return drizzle(db, { schema: { users, accounts, sessions, verificationTokens } });
}

export const { handle, signIn, signOut } = SvelteKitAuth(async ( {platform} ) => {
  
  const DB = platform?.env?.DB;
  if (!DB) {
      throw new Error('Invalid DB');
  }
  const db = createClient(DB);  

  console.log("DB:", db)

  const authOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
      GitHub({
        clientId: AUTH_GITHUB_ID,
        clientSecret: AUTH_GITHUB_SECRET
      })
    ],
    secret: AUTH_SECRET,
    trustHost: true
  }
  return authOptions
})


