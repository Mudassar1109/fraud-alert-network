This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment Checklist

- **Create GitHub repo:** initialize local git and push to GitHub.
- **Connect to Vercel:** import the GitHub repo in Vercel.
- **Set Vercel env vars:** add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` (production) in project settings.
- **Enable HTTPS:** Vercel provides HTTPS automatically for deployments.
- **Verify build:** ensure `npm run build` passes (CI will run it).
- **Verify runtime:** open deployed site and test the report form and reports list.

Local commands before pushing:

```bash
git init
git add .
git commit -m "chore: initial commit"
# Create remote on GitHub (use gh CLI or create manually), then push:
# gh repo create <owner>/<repo> --public --source=. --remote=origin --push
git push -u origin main
```

Vercel import notes:
- When importing, Vercel will detect Next.js and use the `build` script.
- Add the env vars in Vercel UI using the names shown in `.env.example`.

I can attempt to create the GitHub repo and push if you confirm and have `gh` authenticated.
