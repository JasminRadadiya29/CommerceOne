# Deployment Guide for CommerceOne

## Deploying to Vercel

This is a Vite React application, not a Next.js application. Follow these steps to deploy correctly:

### 1. Vercel Configuration

The project includes a `vercel.json` file that configures Vercel to:
- Use Vite as the framework
- Build to the `build` directory
- Handle client-side routing with SPA fallback
- Set proper caching headers

### 2. Build Process

The build process is configured in `package.json`:
```json
{
  "scripts": {
    "build": "vite build --sourcemap"
  }
}
```

### 3. Important Notes

- **Framework**: This is a Vite React app, not Next.js
- **Routing**: Uses React Router v6 for client-side routing
- **Build Output**: Creates a `build` directory (not `.next`)
- **Static Assets**: All assets are optimized and bundled

### 4. Deployment Steps

1. **Connect to Vercel**:
   - Push your code to GitHub/GitLab
   - Import the repository in Vercel
   - Vercel will auto-detect it as a Vite project

2. **Environment Variables** (if needed):
   - Add any environment variables in Vercel dashboard
   - Prefix with `VITE_` for client-side access

3. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 5. Troubleshooting

If you see the error "The file '/vercel/path0/.next/routes-manifest.json' couldn't be found":

1. **Check Framework Detection**: Ensure Vercel detects this as a Vite project, not Next.js
2. **Clear Cache**: Clear Vercel's build cache
3. **Manual Configuration**: Use the `vercel.json` file provided
4. **Redeploy**: Trigger a fresh deployment

### 6. Local Testing

Test the build locally before deploying:
```bash
npm run build
npm run serve
```

### 7. Performance Optimization

The build includes:
- Code splitting with manual chunks
- Asset optimization
- Source maps for debugging
- Proper caching headers

### 8. Environment Variables

Create a `.env` file for local development:
```
NODE_ENV=development
VITE_APP_TITLE=CommerceOne
VITE_APP_DESCRIPTION=Handcrafted with intention
```

For production, set these in Vercel's environment variables section. 