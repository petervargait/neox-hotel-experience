# NEOX Hotel Experience - Deployment Guide 🚀

## Quick Start Deployment

### Step 1: Set up Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: NEOX Hotel Experience TV Application"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Create a new repository named `neoxhotelexperience`
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

```bash
# Add GitHub remote
git remote add origin https://github.com/yourusername/neoxhotelexperience.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Connect via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `neoxhotelexperience` repository
5. Configure project settings:
   - **Project Name**: `neoxhotelexperience`
   - **Framework Preset**: Other
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (will use echo command)
   - **Output Directory**: `public` 
   - **Install Command**: `npm install`

#### Option B: Connect via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 4: Configure Environment Variables

In your Vercel project dashboard, add these environment variables:

#### Required Variables
- `NODE_ENV`: `production`
- `OPENWEATHER_API_KEY`: `your_openweather_api_key_here`

#### Optional Variables
- `DEFAULT_CITY`: `Budapest` (or your hotel's city)
- `HOTEL_NAME`: `NEOX Hotel Experience`

### Step 5: Add NEOX Brand Assets

1. Upload your brand assets to the repository:
   ```bash
   # Add your actual NEOX images to public/images/
   cp /path/to/your/NEOXbackground.png public/images/
   cp /path/to/your/Logo.png public/images/
   
   # Commit the assets
   git add public/images/
   git commit -m "Add NEOX brand assets"
   git push
   ```

2. Vercel will automatically redeploy when you push changes

### Step 6: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://neoxhotelexperience.vercel.app`)
2. Test API endpoints:
   - Health check: `/api/health`
   - Guest data: `/api/guest/401`
   - Weather: `/api/weather/Budapest`
3. Test room-specific URLs:
   - `https://neoxhotelexperience.vercel.app/?room=401`
   - `https://neoxhotelexperience.vercel.app/?roomNumber=Presidential-Suite`

## Custom Domain Setup

### Step 7: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain (e.g., `welcome.neoxhotel.com`)
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning

## TV Setup Instructions

### For Hotel IT Teams

1. **TV Browser Configuration**:
   - Set homepage to: `https://neoxhotelexperience.vercel.app/?room=ROOM_NUMBER`
   - Enable auto-refresh or kiosk mode
   - Disable user controls and navigation bars

2. **Room-Specific URLs**:
   ```
   Room 401: https://neoxhotelexperience.vercel.app/?room=401
   Suite 501: https://neoxhotelexperience.vercel.app/?room=501
   Presidential Suite: https://neoxhotelexperience.vercel.app/?roomNumber=Presidential-Suite
   ```

3. **TV Settings Recommendations**:
   - Resolution: 1920x1080 or 3840x2160
   - Auto-sleep: Disabled
   - Screensaver: Disabled
   - Browser cache: Enabled
   - JavaScript: Enabled

## Monitoring and Maintenance

### Analytics (Optional)
- Add Google Analytics or similar to `public/index.html`
- Monitor API usage in Vercel dashboard
- Set up error monitoring (Sentry, LogRocket, etc.)

### Updates and Maintenance
```bash
# For future updates
git add .
git commit -m "Update: description of changes"
git push

# Vercel will automatically redeploy
```

### Environment Management
- **Development**: `http://localhost:3000`
- **Staging**: Create a separate Vercel project for testing
- **Production**: Your main Vercel deployment

## Troubleshooting

### Common Issues

1. **API not working**:
   - Check environment variables in Vercel dashboard
   - Verify API endpoints in browser developer tools
   - Check Vercel function logs

2. **Images not loading**:
   - Ensure images are in `public/images/` folder
   - Check file names match exactly (case-sensitive)
   - Verify images are committed to Git

3. **Styling issues on TV**:
   - Test with different screen resolutions
   - Check browser zoom level (should be 100%)
   - Verify TV supports modern CSS features

4. **Weather API not working**:
   - Verify OpenWeatherMap API key is valid
   - Check API rate limits
   - App will fallback to mock data if API fails

### Performance Optimization

1. **Image Optimization**:
   ```bash
   # Optimize images before uploading
   # Background should be < 2MB
   # Logo should be < 500KB
   ```

2. **Caching**:
   - Static assets cached for 1 year
   - API responses cached for 60 seconds
   - Browser cache enabled

## Support

- **Repository**: `https://github.com/yourusername/neoxhotelexperience`
- **Live Site**: `https://neoxhotelexperience.vercel.app`
- **Vercel Dashboard**: `https://vercel.com/dashboard`

---

🎉 **Congratulations!** Your NEOX Hotel Experience is now live and ready to welcome guests!