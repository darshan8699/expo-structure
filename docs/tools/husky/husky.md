# Husky Git Hooks

Husky is a popular tool used in JavaScript and TypeScript projects to easily set up Git hooks.

## What are Git hooks?

Git hooks are scripts that Git runs automatically when specific actions happen, such as:

- **`pre-commit`**: Runs before committing code.
- **`pre-push`**: Runs before pushing code.

## How does Husky help?

Husky lets you configure scripts to run at those steps. For example:

1. When you type `git commit -m "my commit"`, Husky intercepts it.
2. It automatically runs code quality checks first, like:
   - `npm run lint` (to find syntax/styling errors)
   - `npm run test` (to make sure you didn't break existing tests)
3. If any check fails, Husky stops/cancels the commit, forcing you to fix the issues.
4. If all checks pass, the commit proceeds normally.

## Why use it?

It acts as a local "gatekeeper". By catching syntax errors, bad formatting, or broken tests before the code leaves your computer, it prevents you from pushing broken code to the repository and wasting time/resources failing the cloud CI/CD pipelines.

---

## How to Configure Husky (v9)

Here is how to set up and configure Husky in your project:

### Step 1: Install Husky

Run this command in the root of your project directory to install Husky as a `devDependency`:

```bash
npm install husky --save-dev
```

### Step 2: Initialize Husky

Initialize Husky automatically using:

```bash
npx husky init
```

This single command performs the following:

- Creates a `.husky/` folder in your project root.
- Adds a `pre-commit` file inside that folder.
- Automatically adds the `prepare` script to your `package.json` under `scripts`:
  ```json
  "prepare": "husky"
  ```
  _(This ensures that any team member who clones the repository and runs `npm install` will automatically have Husky set up on their machine)._

### Step 3: Configure Hooks

Inside the `.husky/` directory, you can add or modify hooks by creating files named after Git hooks (like `pre-commit` or `pre-push`).

#### 1. Configure the `pre-commit` hook

Open `.husky/pre-commit` in your editor. By default, it runs `npm test`. You can change it to run linting and tests:

```bash
# .husky/pre-commit
# Exit immediately if any check fails
set -e

echo "🔍 Running pre-commit checks..."

# Lint and test Expo project
echo "📦 Checking Expo project..."
npm run lint
npm run test

echo "✅ All checks passed successfully! Proceeding with commit."
```

#### 2. Create a `pre-push` hook (Optional)

If you want to run checks right before pushing code to the remote server, create a file named `pre-push` inside `.husky/`:

```bash
# .husky/pre-push
npm run test
```

### Step 4: Test it out

Try to make a commit:

```bash
git add .
git commit -m "test husky setup"
```

You will see Husky run the scripts in your terminal first. If they fail, the commit will be blocked until you fix them!
