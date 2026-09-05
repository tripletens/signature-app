/**
 * Computes mid-point between two coordinate points
 */
export function getMidPoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

/**
 * Draws a smooth stroke from points array using Quadratic Bézier curves
 */
export function drawSmoothStroke(ctx, points, color, width) {
  if (!points || points.length === 0) return;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (points.length === 1) {
    // Single dot
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, width / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    return;
  }

  if (points.length === 2) {
    // Single line segment
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
    ctx.restore();
    return;
  }

  // Quadratic curve interpolation through midpoints
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const mid = getMidPoint(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
  }

  // Draw to the final point
  const lastPoint = points[points.length - 1];
  const secondLastPoint = points[points.length - 2];
  ctx.quadraticCurveTo(
    secondLastPoint.x,
    secondLastPoint.y,
    lastPoint.x,
    lastPoint.y
  );

  ctx.stroke();
  ctx.restore();
}
