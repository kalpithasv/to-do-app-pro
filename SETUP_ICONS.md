# 🎨 Setting Up App Icons for PWA Installation

Your app is now configured as a Progressive Web App (PWA)! Users can install it as a desktop app with your logo.

## 📋 Quick Setup Steps

### Step 1: Prepare Your Logo
- Your logo should be square (same width and height)
- Recommended: 512x512 pixels or larger
- Format: PNG with transparent background (if applicable)

### Step 2: Generate Icons

**Option A: Use the Built-in Tool (Easiest)**
1. Open `scripts/generate-icons.html` in your browser
2. Upload your logo
3. Click "Download All Icons"
4. Place all downloaded icons in the `/public` folder

**Option B: Use Online Tools**
1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo
3. Configure settings:
   - Android Chrome: Yes
   - iOS: Yes
   - Windows Metro: Yes
4. Download the generated package
5. Extract and place icons in `/public` folder

**Option C: Manual Creation**
Create these files in `/public`:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png` ⭐ (Most important)
- `icon-384x384.png`
- `icon-512x512.png` ⭐ (Most important)
- `apple-touch-icon.png` (180x180)

### Step 3: Test Installation

1. Deploy your app to Vercel
2. Visit the deployed URL
3. Look for the install prompt or browser install button
4. Install the app - your logo should appear!

## 🖥️ Desktop Installation

**Chrome/Edge:**
- Look for install icon in address bar
- Or: Menu → "Install To-Do Pro"

**Firefox:**
- Menu → "Install"

**Safari (Mac):**
- File → "Add to Dock"

## 📱 Mobile Installation

**Android:**
- Chrome menu → "Add to Home screen"

**iOS:**
- Safari Share button → "Add to Home Screen"

## ✅ What's Already Configured

- ✅ PWA manifest (`app/manifest.ts`)
- ✅ Install prompt component (`components/PWAInstallPrompt.tsx`)
- ✅ Meta tags for iOS/Android
- ✅ Theme colors
- ✅ App shortcuts

## 🎯 Next Steps

1. **Add your logo icons** to `/public` folder
2. **Deploy to Vercel**
3. **Test installation** on your device
4. **Share the link** - users can install it!

## 📝 Notes

- The 192x192 and 512x512 icons are most critical
- Icons should be square (1:1 ratio)
- Use PNG format for best compatibility
- The logo will appear when users install the app

