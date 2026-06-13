# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbo mode
npm run build        # Production build
npm run check        # Lint + TypeScript type check (run before committing)
npm run lint:fix     # Auto-fix lint issues
npm run typecheck    # TypeScript only
npm run format:write # Auto-format with Prettier

npm run db:push      # Push Prisma schema changes to DB (no migration file)
npm run db:generate  # Create a new migration file and apply it
npm run db:studio    # Open Prisma Studio GUI
```

## Architecture

This is a **T3 Stack** app (Next.js + tRPC + Prisma + Tailwind) that replicates core Airtable functionality.

### Stack
- **Next.js 15** with Pages Router (not App Router) — `src/pages/` is the routing root
- **tRPC 11** for end-to-end type-safe API calls between client and server
- **Prisma** ORM against **MySQL**
- **NextAuth v5 (beta)** with Discord OAuth for authentication
- **TanStack React Table** for the spreadsheet component
- **React Query** via tRPC for server state; no separate client-side state manager

### Request flow
1. Components call tRPC hooks from `~/utils/api` (e.g., `api.base.getAllBaseIds.useQuery()`)
2. tRPC client sends requests to `src/pages/api/trpc/[trpc].ts`
3. Server procedures in `src/server/api/routers/` validate input with Zod, access `ctx.db` (Prisma) and `ctx.session` (NextAuth)
4. `src/server/api/root.ts` aggregates all routers
5. SuperJSON handles serialization of complex types (Dates, etc.)

### Key files
| Path | Purpose |
|---|---|
| `src/pages/_app.tsx` | App shell — SessionProvider + tRPC/React Query setup |
| `src/pages/index.tsx` | Home page: base listing, create/delete base, auth |
| `src/pages/[baseId].tsx` | Per-base page: Navbar + Spreadsheet |
| `src/components/table.tsx` | Main spreadsheet component (TanStack React Table) |
| `src/server/api/trpc.ts` | tRPC context (session + db) and procedure builders |
| `src/server/api/routers/base.ts` | All base CRUD operations |
| `src/server/auth/config.ts` | NextAuth config (Discord provider, session callbacks) |
| `src/server/db.ts` | Prisma client singleton |
| `prisma/schema.prisma` | DB schema (User, Base, Account, Session) |
| `src/env.js` | Environment variable validation (T3 env) |

### Data model
- **Base**: has `baseId` (UUID), `baseName`, `userId` (owner), and `baseData` (JSON blob) — the spreadsheet content is stored in this JSON column
- **User/Account/Session/VerificationToken**: standard NextAuth models

### Path alias
`~/*` resolves to `src/*` — use this instead of relative imports.

## Environment variables

Requires a `.env` file with:
- `DATABASE_URL` — MySQL connection string
- `AUTH_SECRET` — NextAuth secret
- `AUTH_DISCORD_ID` / `AUTH_DISCORD_SECRET` — Discord OAuth credentials

The `src/env.js` file enforces these at build time using T3 env.
