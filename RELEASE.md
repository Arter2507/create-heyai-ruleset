# NPM Release Checklist

## 1. Local preflight

```bash
npm install
npm run release:check
```

`release:check` runs:
- `node --check index.js`
- `npm pack --dry-run`
- `npm whoami`

## 2. Version bump

```bash
npm version patch
```

Use `minor` or `major` when needed.

## 3. Create and push tag (single publish channel)

```bash
git push origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```

This triggers GitHub Actions `Publish npm`.

## 4. Authentication in automation

Preferred: npm trusted publishing via GitHub OIDC.

- In npm package settings, enable trusted publishing for this GitHub repository.
- Workflow publishes with `npm publish --provenance --access public` using OIDC.

Fallback:

- Add `NPM_TOKEN` in GitHub repo secrets.
- Workflow will use token-based publish if OIDC is not configured.

## 5. Quick install validation

```bash
npx create-heyai-ruleset@latest --help
```

## 6. CI/non-interactive example

```bash
npx create-heyai-ruleset@latest ./demo \
  --yes \
  --no-kits \
  --skip-design \
  --agent-name AI
```
