# 📸 Add Your NEOX Images

## Required Files

Place your NEOX brand images in the `public/images/` folder with these **exact** filenames:

### 1. Background Image
- **File**: `NEOXBackground.png`
- **Location**: `public/images/NEOXBackground.png`
- **Purpose**: Main background for the entire application

### 2. Logo Image  
- **File**: `Transparent Logo.png`
- **Location**: `public/images/Transparent Logo.png`
- **Purpose**: NEOX logo displayed in header with blue background and gold styling

## How to Add Them

1. Copy your image files to the correct location:
   ```bash
   cp /path/to/your/NEOXBackground.png public/images/
   cp "/path/to/your/Transparent Logo.png" public/images/
   ```

2. Verify the files are in place:
   ```bash
   ls -la public/images/
   # Should show:
   # NEOXBackground.png
   # Transparent Logo.png
   ```

3. Commit to Git:
   ```bash
   git add public/images/
   git commit -m "Add NEOX brand assets"
   git push
   ```

## Design Notes

- The app will use **NEOXBackground.png** as the full-page background
- The **Transparent Logo.png** will be displayed in the header with a blue background and gold accents
- If images fail to load, the app will fallback to:
  - Solid navy blue background
  - Text-based "NEOX" logo in gold

## File Requirements

- **Format**: PNG (recommended for transparency)
- **Background Image**: Recommended size 1920×1080 or higher
- **Logo**: Should work well on blue background
- **File Size**: Keep images optimized for web (< 2MB for background, < 500KB for logo)

---

Once you add these images, your NEOX Hotel Experience will display with your exact brand assets! 🎨