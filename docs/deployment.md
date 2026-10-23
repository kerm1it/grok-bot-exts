# Deployment

Production: https://bot-extensions.kermitlx.workers.dev

## Release path

1. Open a pull request. CI validates native resources and schemas, checks types and formatting, runs unit tests, builds the static site, and runs browser tests.
2. Merge to `main`. The same checks run again for the exact production commit.
3. The `deploy` job downloads the verified `production-site` artifact and runs `pnpm run deploy`; it does not rebuild the site. The explicit `run` avoids pnpm's unrelated built-in `deploy` command.
4. Production smoke checks verify English and Chinese pages, the sitemap, and a missing route returning 404.

Production runs are serialized and are not cancelled midway by newer pushes. Pull requests do not deploy or receive the deployment token in their verification steps. Cloudflare Workers Builds is not connected, avoiding duplicate releases and its broad default token.

## Credentials

GitHub repository configuration:

- Secret: `CLOUDFLARE_API_TOKEN`.
- Variable: `CLOUDFLARE_ACCOUNT_ID`.
- Deployment environment: `production`, restricted to the `main` branch.

The account-owned token `bot-extensions-github-deploy` grants exactly **Individual Workers Editor** for **bot-extensions**. It cannot create or delete Workers and has no access to other Workers, KV, R2, D1, or zone routes. The site uses its existing `workers.dev` domain, so zone permissions are unnecessary.

The initial token expires on **January 21, 2027**. Rotate it before expiry. Expiry prevents new deployments but does not take the existing site offline.

## Rotate the token

1. In Cloudflare account API tokens, create a replacement with the same single-Worker scope and Editor permission. Set a bounded expiry.
2. Replace the GitHub repository secret `CLOUDFLARE_API_TOKEN`. Never commit or paste the token into an issue, log, or document.
3. Push a reviewed change to `main` and verify both CI jobs and the production smoke checks succeed.
4. Revoke the old token after the replacement is verified, and update the expiry date above.

## Manual recovery

With an authorized Cloudflare login or the dedicated token supplied securely through the environment, run `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm run deploy` from a known-good commit. Re-run `PLAYWRIGHT_BASE_URL=https://bot-extensions.kermitlx.workers.dev pnpm test:e2e` after recovery. Do not bypass a failed validation job for routine releases.
