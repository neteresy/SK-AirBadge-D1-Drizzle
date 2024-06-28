import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: '', // run pnpm wrangler whoami to get this
    databaseId: '', // same as database_id in wrangler.toml
    token: '', // https://dash.cloudflare.com/profile/api-tokens --> "Create Token" --> "Create Custom Token" --> in Permissions select D1 
  },
});
