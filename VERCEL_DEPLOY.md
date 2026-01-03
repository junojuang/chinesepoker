# Deploying to Vercel

## Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (for first deployment)
   - Project name? (Press Enter for default or enter a custom name)
   - Directory? (Press Enter - it will use current directory)
   - Override settings? (Press Enter for No)

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

## Method 2: Deploy via GitHub (Recommended for Continuous Deployment)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**:
   - Vercel will auto-detect Vite settings
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Install Command: `npm install` (should be auto-detected)

4. **Environment Variables** (if needed):
   - You don't need to set Firebase env vars since they're in your config file
   - But if you want to use env vars, add them in the Vercel dashboard

5. **Click "Deploy"**

## Method 3: Deploy via Vercel Dashboard (Drag & Drop)

1. **Build your project locally**:
   ```bash
   npm run build
   ```

2. **Go to Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select "Deploy" tab
   - Drag and drop the `dist` folder

## Notes

- **Auto-detection**: Vercel should automatically detect your Vite project
- **Build output**: Your built files will be in the `dist` directory
- **Firebase**: Your Firebase config is already in the code, so no environment variables needed
- **HTTPS**: Vercel provides HTTPS by default
- **Custom domain**: You can add a custom domain in Vercel dashboard after deployment

## Troubleshooting

If deployment fails:
1. Check that `npm run build` works locally
2. Make sure all dependencies are in `package.json`
3. Check Vercel build logs for errors
4. Ensure Firebase config is correct (it should work since it's client-side)

## After Deployment

Your app will be available at: `https://your-project-name.vercel.app`

You can also check your deployments in the Vercel dashboard.

