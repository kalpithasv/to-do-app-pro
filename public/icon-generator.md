# Icon Generator Instructions

To create app icons from your logo, you need to generate icons in these sizes:

## Required Icon Sizes:
- 72x72.png
- 96x96.png
- 128x128.png
- 144x144.png
- 152x152.png
- 192x192.png (Most important - used for Android)
- 384x384.png
- 512x512.png (Most important - used for PWA install)
- apple-touch-icon.png (180x180 - for iOS)

## How to Generate Icons:

### Option 1: Online Tools
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload your logo
3. Download all generated icons
4. Place them in the `/public` folder

### Option 2: Using Image Editing Software
1. Open your logo in Photoshop/GIMP/Canva
2. Resize to each required size
3. Export as PNG with transparent background (if applicable)
4. Save with the exact names listed above in the `/public` folder

### Option 3: Using Command Line (ImageMagick)
If you have ImageMagick installed:
```bash
convert logo.png -resize 192x192 icon-192x192.png
convert logo.png -resize 512x512 icon-512x512.png
# Repeat for all sizes
```

## Important Notes:
- Icons should be square (same width and height)
- Use PNG format with transparency if your logo has it
- The 192x192 and 512x512 icons are most critical
- Icons will appear when users install the app as a desktop app

