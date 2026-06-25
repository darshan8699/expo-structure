# Automated Release & Commit Workflow

This document explains the complete, automated toolchain used in this project to enforce code quality, standardize commit messages, and fully automate application versioning. This setup mirrors the exact workflow used in the Zyrous `asthma-australia-app`.

---

## 🛠️ The Toolchain (What and Why)

We use a combination of 5 tools that work together seamlessly:

1. **Husky**: A Git hooks manager. It intercepts Git commands (like `git commit`) and allows us to run scripts before the action completes.
2. **Lint-Staged**: Instead of running a linter over the entire project, Lint-Staged runs linters and formatters _only on the files you are currently trying to commit_. This makes the pre-commit process extremely fast.
3. **Prettier & ESLint**: Tools to automatically format code (Prettier) and catch programmatic/stylistic errors (ESLint).
4. **Commitlint**: A tool that enforces the **Conventional Commits** standard (e.g., `feat: added login`, `fix: resolved crash`). It ensures all commit messages follow a strict, readable format.
5. **Semantic Release**: A CI/CD tool that analyzes your Git commit history and automatically bumps version numbers (Major/Minor/Patch), generates a `CHANGELOG.md`, and creates Git tags/releases.

---

## 🔄 How the Workflow Actually Works

Here is the step-by-step lifecycle of a developer making a change:

1. **Staging**: You make changes to your code and run `git add .`
2. **Committing**: You run `git commit -m "feat: added a new button"`
3. **Pre-Commit Hook**:
   - Husky catches the commit and triggers the `.husky/pre-commit` hook.
   - This runs **Lint-Staged**.
   - Lint-Staged runs `npm run lint:fix` and `npm run format` (ESLint & Prettier) on your staged files.
   - _If there is a syntax error that cannot be auto-fixed, the commit is blocked!_
4. **Commit-Msg Hook**:
   - If the code passes formatting, Husky triggers the `.husky/commit-msg` hook.
   - This runs **Commitlint**.
   - Commitlint checks if your message (`feat: added a new button`) is formatted correctly.
   - _If you wrote "added button" instead, the commit is blocked!_
5. **Push & Merge**: Your perfectly formatted code and commit message are pushed and eventually merged into the `main`, `staging`, or `develop` branch.
6. **Automated Release**:
   - GitHub Actions detects the merge and triggers Semantic Release.
   - Semantic Release reads the commits. It sees `feat:` and automatically bumps the Minor version (e.g., `v1.0.0` -> `v1.1.0`).
   - The `semantic-release-expo` plugin automatically updates `package.json` and `app.json` with the new version.
   - It generates the `CHANGELOG.md`.
   - It commits these three files back to the repository (using a `[skip ci]` tag so it doesn't trigger an infinite loop).

---

## 📝 Implementation Steps

If you ever need to replicate this setup on a new project, follow these steps:

### 1. Install Dependencies

```bash
npm install --save-dev husky lint-staged prettier @commitlint/cli @commitlint/config-conventional semantic-release semantic-release-expo @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/changelog @semantic-release/npm @semantic-release/github @semantic-release/git
```

### 2. Configure package.json

Add the necessary scripts and the Semantic Release configuration directly to `package.json`:

```json
{
  "scripts": {
    "lint:fix": "expo lint --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "prepare": "husky"
  },
  "release": {
    "tagFormat": "v${version}",
    "branches": ["main", "staging", "develop"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "semantic-release-expo",
      "@semantic-release/changelog",
      ["@semantic-release/npm", { "npmPublish": false }],
      ["@semantic-release/github", {}],
      [
        "@semantic-release/git",
        {
          "assets": ["CHANGELOG.md", "package.json", "app.json"]
        }
      ]
    ]
  }
}
```

### 3. Setup Lint-Staged

Create `.lintstagedrc.json` in the root:

```json
{
  "*.{js,jsx,ts,tsx}": ["npm run lint:fix", "npm run format"]
}
```

### 4. Setup Commitlint

Create `commitlint.config.ts` in the root. We include an `ignores` rule so that Semantic Release's automated commits (`[skip ci]`) are not blocked.

```typescript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(message: string) => message.includes("[skip ci]")],
};
```

### 5. Initialize Husky & Hooks

Run the following commands to create the `.husky` directory and the two hooks:

```bash
npx husky init
echo "npx lint-staged" > .husky/pre-commit
echo "npx commitlint --edit" > .husky/commit-msg
chmod +x .husky/pre-commit .husky/commit-msg
```

### 6. Setup CI/CD Action

Create `.github/workflows/release.yml` to run the release process when merging to main/develop:

```yaml
name: Release
on:
  push:
    branches:
      - main
      - develop
      - staging

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
