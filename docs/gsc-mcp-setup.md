# Google Search Console MCP setup (mcp-gsc)

Connects [AminForou/mcp-gsc](https://github.com/AminForou/mcp-gsc) (PyPI package
`mcp-search-console`) to Claude Code so you can ask about live Search Console
data in a session instead of exporting CSVs — search analytics, position
trends, indexing status, sitemap checks, and period-over-period comparisons.

The MCP server itself is already wired up in `.mcp.json` at the repo root. What's
left is the Google-side setup and dropping in a credentials file. Those steps
need your Google account, so they can't be automated from here.

## Why service-account auth (not OAuth)

This project runs in a remote, browser-less Claude Code environment. The server's
OAuth mode opens a browser to log in, which won't work here. A **service account**
authenticates from a JSON key with no browser, so that's what `.mcp.json` is
configured for (`GSC_SKIP_OAUTH: "true"`).

## One-time Google setup

1. **Google Cloud project + API**
   - Go to <https://console.cloud.google.com/>, create a project (or reuse one).
   - Enable the **Google Search Console API** (APIs & Services → Library → search
     "Search Console API" → Enable).

2. **Create a service account + key**
   - IAM & Admin → Service Accounts → Create service account (name it e.g.
     `gsc-reader`). No project roles are needed.
   - On the new account: Keys → Add key → Create new key → **JSON** → download it.
   - Note the account's email, which looks like
     `gsc-reader@your-project.iam.gserviceaccount.com`.

3. **Share the property with the service account** ← the step everyone forgets
   - In Search Console for `study.thedegreegap.com`: Settings → Users and
     permissions → Add user.
   - Paste the service-account email. Grant **Full** (or **Restricted**, which is
     enough for read-only Search Analytics).
   - Skipping this is the #1 cause of `403` errors from the API.

## Wire up the credentials

The server reads the key from a file path in the `GSC_CREDENTIALS_PATH`
environment variable (referenced by `.mcp.json`).

- **Never commit the key.** `.gitignore` already blocks `.secrets/` and
  `*service_account*.json`, but double-check before any commit.
- Put the downloaded key somewhere outside version control, e.g.
  `./.secrets/gsc_service_account.json`, and set the env var to its absolute path:

  ```bash
  export GSC_CREDENTIALS_PATH="/home/user/thedegreegap-study/.secrets/gsc_service_account.json"
  ```

- In a **persistent** Claude Code setup, set `GSC_CREDENTIALS_PATH` in your
  environment/settings so it's present every session. Because this container is
  ephemeral, the key file and env var need re-providing on each fresh session —
  a `SessionStart` hook can write the key from a stored secret and export the
  path automatically (ask and I'll add one).

## Runtime requirements (already present here)

- `uv` / `uvx` installed (`uvx` runs `mcp-search-console` with no manual install).
- Python 3.11+ (the package requires it).

If `uvx` isn't on `PATH` in your environment, either install uv
(`curl -LsSf https://astral.sh/uv/install.sh | sh`) or change the `command` in
`.mcp.json` to the absolute path from `which uvx`.

## Verify

1. Start a new Claude Code session in this repo (project MCP servers load from
   `.mcp.json`; approve the `gsc` server when prompted).
2. Ask: **"List my GSC properties."** If `study.thedegreegap.com` comes back,
   you're connected.
3. Then try: **"Show the last 28 days of Search Analytics for the
   `/locations/wigan-tutors/` pages, position and impressions, vs the previous
   28 days."**

## Tools the server exposes (20)

List properties, site details, search analytics, performance overview, period
comparison, single and batch URL inspection, indexing audits, sitemap
management, and auth refresh.
