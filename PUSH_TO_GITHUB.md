# How to Push to GitHub

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `to-do-app-pro`
4. **Don't** check "Initialize with README"
5. Click "Create repository"

## Step 2: Push Your Code

Run these commands in your terminal (from your project folder):

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit: To-Do Pro app ready for deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/to-do-app-pro.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your `to-do-app-pro` repository
5. Click "Deploy"

Done! Your app will be live in ~2 minutes.

