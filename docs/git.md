# Git Branch Management

This document details how the **`initial-code`** branch was created from the template initialization state, and how to manage branches in this repository.

---

## The `initial-code` Branch

The `initial-code` branch is a clean-slate branch pointing to the exact moment the Expo and React Native CLI templates were first created (`640d1ef`), before any code cleanups, Husky setups, or CI/CD pipelines were added.

### How to Switch to the `initial-code` Branch
To checkout this branch locally:
```bash
git checkout initial-code
```

---

## How it was Created (Recreating the Branch)

If you ever need to recreate a branch from a specific historical commit, follow these steps:

### Step 1: Find the target commit hash
Search your Git history to find the commit hash you want to point to:
```bash
git log --oneline -n 20
```
In this case, the target commit was `feat: add ExpoStructure expo app` with the hash **`640d1ef`**.

### Step 2: Create a local branch at that commit
Run `git branch` followed by your desired branch name and the commit hash:
```bash
git branch initial-code 640d1ef
```

### Step 3: Push the new branch to GitHub
Upload the branch to your remote repository:
```bash
git push origin initial-code
```
