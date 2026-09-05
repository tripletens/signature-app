/**
 * Calculates the bounding box of drawn pixels on a canvas
 */
export function getCanvasBoundingBox(canvas, padding = 20) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  if (width === 0 || height === 0) {
    return { x: 0, y: 0, width: 0, height: 0, isEmpty: true };
  }

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let hasDrawnPixels = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alphaIndex = (y * width + x) * 4 + 3;
      const alpha = data[alphaIndex];

      if (alpha > 10) {
        hasDrawnPixels = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasDrawnPixels) {
    return { x: 0, y: 0, width, height, isEmpty: true };
  }

  // Apply padding while clamping to canvas dimensions
  const paddedMinX = Math.max(0, minX - padding);
  const paddedMinY = Math.max(0, minY - padding);
  const paddedMaxX = Math.min(width, maxX + padding);
  const paddedMaxY = Math.min(height, maxY + padding);

  return {
    x: paddedMinX,
    y: paddedMinY,
    width: Math.max(1, paddedMaxX - paddedMinX),
    height: Math.max(1, paddedMaxY - paddedMinY),
    isEmpty: false,
  };
}

/**
 * Generates an exported canvas blob or dataURL with format, cropping, and resolution options
 */
export async function createExportCanvas({
  sourceCanvas,
  format = 'png',
  backgroundColor = 'transparent',
  cropWhitespace = true,
  scale = 2,
  quality = 0.95,
}) {
  const bbox = cropWhitespace
    ? getCanvasBoundingBox(sourceCanvas, 24 * scale)
    : {
        x: 0,
        y: 0,
        width: sourceCanvas.width,
        height: sourceCanvas.height,
        isEmpty: false,
      };

  const offscreen = document.createElement('canvas');
  offscreen.width = bbox.width * (scale / (sourceCanvas._dpr || 1));
  offscreen.height = bbox.height * (scale / (sourceCanvas._dpr || 1));

  const offCtx = offscreen.getContext('2d');
  offCtx.imageSmoothingEnabled = true;
  offCtx.imageSmoothingQuality = 'high';

  // Normalize format
  const isJpeg = format.toLowerCase() === 'jpeg' || format.toLowerCase() === 'jpg';
  const mimeType = isJpeg ? 'image/jpeg' : 'image/png';

  // Background handling: JPEG cannot be transparent, default to white if transparent
  if (isJpeg) {
    offCtx.fillStyle = backgroundColor === 'transparent' ? '#ffffff' : backgroundColor;
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  } else if (backgroundColor !== 'transparent') {
    offCtx.fillStyle = backgroundColor;
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  }

  // Draw the cropped portion from the source canvas onto the offscreen canvas
  offCtx.drawImage(
    sourceCanvas,
    bbox.x,
    bbox.y,
    bbox.width,
    bbox.height,
    0,
    0,
    offscreen.width,
    offscreen.height
  );

  return {
    canvas: offscreen,
    mimeType,
    isEmpty: bbox.isEmpty,
    dataUrl: offscreen.toDataURL(mimeType, quality),
  };
}

/**
 * Triggers a browser file download
 */
export function triggerDownload(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copies canvas image to system clipboard as PNG
 */
export async function copyToClipboard(sourceCanvas) {
  try {
    const { canvas } = await createExportCanvas({
      sourceCanvas,
      format: 'png',
      backgroundColor: 'transparent',
      cropWhitespace: true,
      scale: 2,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error('Blob creation failed');
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    }, 'image/png');

    return { success: true };
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return { success: false, error: err.message };
  }
}
