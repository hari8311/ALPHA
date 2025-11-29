# LiveWalls - Live Wallpaper Website

A modern, responsive website for viewing and downloading live wallpapers.

## Features

- 🎨 Beautiful, modern UI with gradient effects
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎬 Live video previews in gallery
- 🔍 Category filtering (Nature, Abstract, Space, Minimal)
- 👁️ Full-screen preview modal
- ⬇️ One-click download functionality
- ⚡ Smooth animations and transitions
- 🌙 Dark theme optimized

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Video HTML5 API

## How to Use

1. Open `index.html` in any modern web browser
2. Browse the wallpaper gallery
3. Click on any wallpaper to view it in full screen
4. Use the category filters to find specific types
5. Click the download button to save wallpapers

## Customization

### Adding Your Own Wallpapers

Edit the `wallpapers` array in `script.js`:

```javascript
{
    id: 10,
    title: "Your Wallpaper Name",
    category: "nature", // or abstract, space, minimal
    resolution: "1920x1080",
    thumbnail: "path/to/thumbnail.mp4",
    videoUrl: "path/to/fullsize.mp4"
}
```

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent: #ec4899;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for personal and commercial projects.
