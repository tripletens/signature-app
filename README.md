# SignCraft — Free Signature Generator & Exporter

A fast, responsive React web application to draw freehand signatures and download them in **PNG**, **JPEG**, or **JPG** formats with advanced options.

---

## 🚀 Features

- **Multi-Format Export:**
  - **PNG:** Lossless format with transparent alpha background support.
  - **JPEG / JPG:** Solid white background fallback (preventing black-background artifacts).
- **Auto-Crop Whitespace:** Intelligently calculates the drawn signature's bounding box and crops excess empty space with custom padding.
- **High-DPI Retina Support:** Smooth strokes scaled with `window.devicePixelRatio`.
- **Natural Fluid Strokes:** Quadratic Bézier curve interpolation for smooth pen physics.
- **Customizable Inks & Strokes:** Preset colors (Black, Royal Blue, Navy, Emerald, Crimson, Purple, Custom) and thickness presets with fine-tuning slider.
- **Background Styling:** Transparent checkerboard, Solid White, Parchment, Light Gray, and Dark Navy.
- **Full History Stack:** Undo (`Cmd+Z` / `Ctrl+Z`), Redo (`Cmd+Y` / `Ctrl+Y`), and Clear.
- **Quick Actions:** One-click copy directly to system clipboard to paste into Word, Google Docs, or email.
- **Zero Server Storage:** 100% client-side privacy.

---

## 🛠️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```
