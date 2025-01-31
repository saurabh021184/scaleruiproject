## Directory Structure

Here’s the **folder structure** for the updated application with **Prisma**, **API routes**, and the `app` directory structure in Next.js:

```sh

/app
  /api
    /auth
      /login
        route.ts     # API route for login
      /recover
        route.ts     # API route for password recovery
  /auth
    /login
      page.tsx       # Login page
    /recover
      page.tsx       # Password recovery page
  layout.tsx         # Root layout for the app
  globals.css        # Global styles (includes TailwindCSS setup)
/lib
  prisma.ts          # Prisma client initialization
/prisma
  schema.prisma      # Prisma schema definition
  seed.ts            # (Optional) Seed script for initial database setup
/public
  (Static assets folder if needed)
/styles
  (Optional additional styles folder)
/node_modules
  (Node.js modules installed by npm)
/.env                 # Environment variables (e.g., DATABASE_URL)
/next.config.js       # Next.js configuration
/package.json         # Project dependencies and scripts
/tsconfig.json        # TypeScript configuration
```

---

### Key Components of the Structure

#### `/app/api/auth`
- **Purpose**: Contains API routes for handling authentication logic.
- Includes `login` and `recover` endpoints to process user credentials and password recovery.

#### `/app/auth`
- **Purpose**: Contains client-side pages for the login and password recovery UI.

#### `/lib`
- **Purpose**: Contains reusable libraries, such as the Prisma client initialization.

#### `/prisma`
- **Purpose**: Prisma-related files, including the schema and seed script.

#### `/app/layout.tsx`
- Root layout for the Next.js application.

#### `/app/globals.css`
- Global styles for the application, including TailwindCSS setup.

---

This structure keeps authentication logic separate from UI code and ensures that the application is modular and maintainable.

## Questions
1. How to use `useRouter` & `usePathname`, `useSearchParams` - in Next.js?
1. "use client" vs "use server" - in Next.js?
1. Layout.tsx
1. error.tsx
1. How to use Prisma with Next.js?


##  References
1. https://www.prisma.io/docs/getting-started/quickstart-sqlite