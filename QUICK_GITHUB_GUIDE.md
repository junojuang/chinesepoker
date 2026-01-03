# Quick Guide: Push to GitHub

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `poker-card-game` (or any name)
3. Choose Public or Private
4. **Don't** check "Initialize with README"
5. Click "Create repository"

## Step 2: Run These Commands

**In your terminal, navigate to your project folder and run:**

```bash
cd "/Users/justin/untitled folder"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Poker Card Game"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Replace These Values:

- `YOUR_USERNAME` → Your GitHub username
- `REPO_NAME` → The repository name you created (e.g., `poker-card-game`)

## Example:

If your GitHub username is `johndoe` and repo name is `poker-card-game`:

```bash
git remote add origin https://github.com/johndoe/poker-card-game.git
```

## Authentication

When you push, GitHub will ask for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)

To create a token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Check `repo` permission
4. Copy the token and use it as your password

## Done! 

Your code is now on GitHub. You can then:
- Deploy to Vercel by connecting your GitHub repo
- Share the code with others
- Continue developing and pushing updates

