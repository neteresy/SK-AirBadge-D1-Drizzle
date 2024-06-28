# AirBadge + D1 + Drizzle
---
#### <u>Works</u> with '@auth/sveltekit' as it is
#### <u>Still Doesn't work</u> with '@airbadge/sveltekit' (for now).
---

#### 1. Clone Repo
```bash
git clone git@github.com:openmenta/SK-AirBadge-D1-Drizzle.
```

#### 2. Replace instances of 'project-name' with your project name in:
- package.json
- wrangler.toml

#### 3. Install Dependencies
```bash
pnpm i
```

#### 4. Environment variables
```bash
mv .env.example .env
```

```bash
AUTH_GITHUB_ID='' # https://github.com/settings/developers
AUTH_GITHUB_SECRET='' # https://github.com/settings/developers

SECRET_STRIPE_KEY='' # https://dashboard.stripe.com/test/dashboard

DOMAIN='http://localhost:8788' # wrangler dev default
AUTH_SECRET='' # pnpm auth secret
AUTH_TRUST_HOST='true'
```

#### 5. Create new D1 database
```bash
pnpm wrangler d1 create project-name # I use the same name as the project
```

#### 6. Copy from terminal -->  Paste in wrangler.toml
```toml
[[d1_databases]]
binding = "DB" # Leave as is
database_name = "project-name"
database_id = "" # If you closed the terminal run `pnpm wrangler d1 list` 
```

#### 7. Fill in dbCredentials in drizzle.config.ts:
```typescript
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
```

#### 8. Generate .sql file and push to D1
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

#### 9. Deploy
```bash
pnpm run deploy # Press "y" when it asks to create new project
```

#### 10. Execute migration for local development
```bash
# If it's not first time, you might want to DROP the tables first
# Adding these lines at the top of the drizzle/.sql file:
# DROP TABLE IF EXISTS `authenticator`;
# DROP TABLE IF EXISTS `account`;
# DROP TABLE IF EXISTS `session`;
# DROP TABLE IF EXISTS `user`;
# DROP TABLE IF EXISTS `verificationToken`;

pnpm wrangler d1 execute project-name --file=./drizzle/<0000_xxx_xxx>.sql # replace with the actual file name
```

#### 11. Stripe login
```bash
# login to Stripe
stripe login

# create products & pricing
stripe prices create \
  --product-data.name="Basic Plan" \
  --lookup-key=basic_monthly \
  --currency=usd \
  --unit-amount=1000 \
  --recurring.interval=month

stripe prices create \
  --product-data.name="Pro Plan" \
  --lookup-key=pro_monthly \
  --currency=usd \
  --unit-amount=2500 \
  --recurring.interval=month

stripe prices create \
  --product-data.name="Enterprise Plan" \
  --lookup-key=enterprise_monthly \
  --currency=usd \
  --unit-amount=10000 \
  --recurring.interval=month
```

#### 12. Stripe Forward webhook
```bash
stripe listen --forward-to localhost:8788/billing/webhooks
```

#### 13. Clear cache from http://localhost:8788/

#### 14. revoke all users in Github OAuth app:
https://github.com/settings/developers

#### 12. Run
```bash
pnpm run preview # or pnpm run dev 
```

### Discord AirBadge's channel 'support' message:

I got AuthJS working with D1
https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1

And DrizzleAdapter.
https://authjs.dev/getting-started/adapters/drizzle

I updated the src/lib/schema.ts for Drizzle with SQLite for D1, with the additional fields required by AirBadge (I could have made mistakes).

#### src/auth.ts --> exported in hooks.server.ts with "@auth/sveltekit":
```typescript
export const { handle, signIn, signOut } = SvelteKitAuth(async ( {platform} ) => { //for D1, accessing platform is required.
  ...
  });
```

#### But when I change to "@airbadge/sveltekit":
I get the following TS Error:
```bash
Binding element 'platform' implicitly has an 'any' type.ts(7031)
```

I'm sure it's a simple fix, but despite my efforts, I couldn't understand much how it works.

In the README.md you have the steps to reproduce the error.

When I solve it, I'll be happy to contribute to the AirBadge documentation for Drizzle and D1.

Thank you very much for the library!