// src/routes/signout/+page.server.ts
import { signOut } from "../../auth"

export const actions = { default: signOut }