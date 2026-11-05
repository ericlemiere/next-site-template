# New Site Setup

How to start a new site from this template: clone it, create a Sanity organization and project, install dependencies, push to a new GitHub repo, and deploy on Vercel.

Run every command from the project root unless noted.

---

## 0. Prerequisites

| Tool | Check | Install |
| --- | --- | --- |
| Node.js **22.12+** | `node -v` | https://nodejs.org or `nvm install 22` |
| Git | `git --version` | preinstalled on macOS |
| GitHub CLI | `gh --version` | `brew install gh`, then `gh auth login` |
| Sanity account | — | https://www.sanity.io |
| Vercel account | — | https://vercel.com (sign in with GitHub) |

---

## 1. Clone the template

Clone with fresh git history. The new site then starts with one clean commit, and none of the template's old commits go to the new repo (GitHub's secret scanning can block pushes that contain old commits).

```bash
git clone --depth 1 https://github.com/ericlemiere/next-site-template.git my-new-site
cd my-new-site
rm -rf .git
git init -b main
```

Replace `my-new-site` with the project's folder name.

---

## 2. Install dependencies

```bash
npm install
```

- `.npmrc` sets `legacy-peer-deps=true`. Some Sanity plugins need it, so leave it in place.
- `postinstall` runs `patch-package` to apply fixes from `patches/`.

---

## 3. Create a Sanity organization

You can only create organizations in the web dashboard. The CLI can't do it.

1. Go to https://www.sanity.io/manage
2. Open the organization switcher (top left) and choose **Create organization**.
3. Name it after the client and choose a plan.
4. Copy the **Organization ID** from **Settings** (it looks like `oXXXXXXXX`). You need it in the next step.

---

## 4. Create a Sanity project in that organization

```bash
npx sanity login
npx sanity projects create "Client Site Name" \
  --organization <ORG_ID> \
  --dataset production \
  --dataset-visibility public
```

The command prints the new **project ID**. Copy it.

> The dataset must be **public**: the site search (`src/sanity/lib/search.ts`) queries Sanity without a token.

You can also create the project at https://www.sanity.io/manage: open the organization, choose **Create project**, and add a `production` dataset.

You don't need to import any schemas. They live in code (`src/sanity/schemaTypes`) and load with the Studio, which is embedded in the site at `/admin`.

---

## 5. Set environment variables

```bash
cp .example.env .env.local
```

Fill in `.env.local`:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_ENVIRONMENT` | `"live"` while building the site. Set `"production"` on the production deployment to hide the "Disable Draft Mode" button. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | The project ID from step 4 |
| `NEXT_PUBLIC_SANITY_DATASET` | `"production"` |
| `SANITY_API_READ_TOKEN` | **Required.** The site won't start without it. See below. |
| `SANITY_STUDIO_PREVIEW_URL` | `http://localhost:3000` locally, the Vercel URL in production |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally, the live domain in production |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Leave as is |
| `MUX_SECRET_KEY` | Only needed if the site uses Mux video |

Create the read token and paste it into `SANITY_API_READ_TOKEN`:

```bash
npx sanity tokens create "Next.js read" --role viewer
```

Allow the local site to talk to Sanity:

```bash
npx sanity cors add http://localhost:3000 --credentials
```

> `.env.local` is gitignored, so it is never committed. Keep real keys out of `.example.env`, which **is** committed.

> `src/sanity/env.ts` falls back to the template's original project ID when `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing. If the site shows the wrong content, check that variable first.

---

## 6. Run it locally

```bash
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/admin

The dataset starts empty. Log in to the Studio and fill in **Home Page**, **Header**, **Footer**, and **Site Settings**, and the front end will fill in.

Optional:

```bash
npx sanity schemas deploy   # lets Sanity's cloud tools see the schema
npm run typegen             # regenerates sanity.types.ts after schema changes
```

---

## 7. Create the GitHub repo and push

Update `"name"` in `package.json` for the new site, then commit:

```bash
git add -A
git commit -m "Initial commit from site template"
```

Create the repo and push with the GitHub CLI:

```bash
gh repo create <github-user-or-org>/<repo-name> --private --source=. --remote=origin --push
```

Or, if you created an empty repo on github.com (no README or .gitignore):

```bash
git remote add origin https://github.com/<github-user-or-org>/<repo-name>.git
git push -u origin main
```

If you work on a `develop` branch:

```bash
git checkout -b develop
git push -u origin develop
```

---

## 8. Create the Vercel project

1. Go to https://vercel.com/new and **Import** the GitHub repo. If it isn't listed, use **Adjust GitHub App Permissions** to grant Vercel access.
2. **Framework Preset:** Next.js (detected automatically). Leave the build and install commands as they are.
3. **Environment Variables:** add everything from `.env.local`, with these changes for production:
   - `NEXT_PUBLIC_ENVIRONMENT` = `production`
   - `NEXT_PUBLIC_SITE_URL` = the live domain (or the `*.vercel.app` URL until the domain is connected)
   - `SANITY_STUDIO_PREVIEW_URL` = the Vercel URL
4. Click **Deploy**.
5. **Production branch:** Vercel deploys the repo's default branch to production. To change it, go to **Settings → Git → Production Branch**.
6. **Custom domain:** go to **Settings → Domains**.

Or set it up from the terminal with the Vercel CLI:

```bash
npx vercel link            # create the Vercel project and link it to this folder
npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production   # repeat for each variable
npx vercel --prod
```

### Allow the deployed site to talk to Sanity

Add each deployed origin to Sanity's CORS list. Without it, the Studio at `/admin` and live preview won't work there.

```bash
npx sanity cors add https://<project>.vercel.app --credentials
npx sanity cors add https://www.clientdomain.com --credentials
```

For preview deployments, add a wildcard origin: `npx sanity cors add "https://*-<vercel-team>.vercel.app" --credentials --yes`.

---

## Checklist

- [ ] Cloned with fresh git history (`rm -rf .git && git init`)
- [ ] `npm install` succeeded
- [ ] Sanity organization and project created; dataset `production` is public
- [ ] `.env.local` filled in, including `SANITY_API_READ_TOKEN`
- [ ] CORS: `http://localhost:3000` added
- [ ] Site and `/admin` load locally
- [ ] `package.json` name updated, committed, pushed to GitHub
- [ ] Vercel project imported, env vars set, deployed
- [ ] CORS: Vercel URL and live domain added
- [ ] Custom domain connected; `NEXT_PUBLIC_SITE_URL` updated

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `Missing SANITY_API_READ_TOKEN` | Set the token in `.env.local` (or in Vercel env vars), then restart `npm run dev`. |
| Studio shows a CORS error | Add the origin: `npx sanity cors add <origin> --credentials` |
| Site shows another site's content | `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing or wrong (see the note in step 5). |
| `git push` rejected: "Push cannot contain secrets" | A commit contains an API key. Remove it from the commit (or start fresh history as in step 1), and revoke the key. |
| `npm install` peer dependency errors | Make sure `.npmrc` (with `legacy-peer-deps=true`) is in the project root. |
| Search returns nothing | The dataset must be public (step 4). |
| Vercel env var changes have no effect | Redeploy. Env vars apply only to new deployments. |
