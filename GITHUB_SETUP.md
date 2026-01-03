# Pushing to GitHub

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `poker-card-game` (or any name you prefer)
   - **Description**: (optional) "Poker Card Game - Vue.js"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Initialize Git in Your Project

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Poker Card Game"
```

## Step 3: Connect to GitHub and Push

After creating the GitHub repo, you'll see instructions. Use these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/poker-card-game.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Complete Commands (Copy & Paste)

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name:

```bash
cd "/Users/justin/untitled folder"
git init
git add .
git commit -m "Initial commit: Poker Card Game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## If You Need to Authenticate

GitHub requires authentication. You can:

1. **Use GitHub CLI** (recommended):
   ```bash
   brew install gh
   gh auth login
   ```

2. **Use Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` permissions
   - Use the token as password when pushing

3. **Use SSH** (for advanced users):
   - Set up SSH keys in GitHub Settings → SSH and GPG keys
   - Use SSH URL: `git@github.com:YOUR_USERNAME/REPO_NAME.git`

## Future Updates

After making changes, push updates with:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

- **"remote origin already exists"**: 
  ```bash
  git remote remove origin
  git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
  ```

- **"Authentication failed"**: Make sure you're logged in or using a token
- **"Branch 'main' does not exist"**: 
  ```bash
  git checkout -b main
  git push -u origin main
  ```

