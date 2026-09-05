import React, { useRef, useEffect, useCallback } from 'react';
import { drawSmoothStroke } from '../utils/strokeSmoothing';

export default function SignatureCanvas({
  strokes,
  onStrokeComplete,
  penColor,
  penWidth,
  backgroundColor,
  showGuideLine = true,
  canvasRef,
}) {
  const internalCanvasRef = useRef(null);
  const activeCanvas = canvasRef || internalCanvasRef;
  const isDrawingRef = useRef(false);
  const currentPointsRef = useRef([]);

  // Redraw the entire canvas including background and all history strokes
  const redraw = useCallback(() => {
    const canvas = activeCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = canvas._dpr || 1;

    // Reset transform and clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply scaling
    ctx.scale(dpr, dpr);

    // Draw background if not transparent
    if (backgroundColor && backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }

    // Draw all completed strokes
    strokes.forEach((stroke) => {
      drawSmoothStroke(
        ctx,
        stroke.points,
        stroke.color || penColor,
        stroke.width || penWidth
      );
    });

    // Draw active stroke currently in progress
    if (isDrawingRef.current && currentPointsRef.current.length > 0) {
      drawSmoothStroke(ctx, currentPointsRef.current, penColor, penWidth);
    }
  }, [activeCanvas, strokes, penColor, penWidth, backgroundColor]);

  // Handle Resize and High-DPI Scaling safely
  useEffect(() => {
    const canvas = activeCanvas.current;
    if (!canvas) return;

    let animationFrameId;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const width = rect.width > 0 ? rect.width : 600;
      const height = rect.height > 0 ? rect.height : 400;

      // Set actual pixel buffer dimensions
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas._dpr = dpr;
        redraw();
      }
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateCanvasSize);
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      resizeObserver.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [activeCanvas, redraw]);

  // Redraw when strokes, colors, or props change
  useEffect(() => {
    redraw();
  }, [redraw]);

  // Get accurate coordinates relative to the canvas CSS layout
  const getCanvasCoords = (e) => {
    const canvas = activeCanvas.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    // Only handle primary pointer (left click or primary touch)
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const canvas = activeCanvas.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // Graceful fallback if pointer capture fails
    }

    isDrawingRef.current = true;
    const pt = getCanvasCoords(e);
    currentPointsRef.current = [pt];
    redraw();
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;

    const pt = getCanvasCoords(e);
    currentPointsRef.current.push(pt);
    redraw();
  };

  const handlePointerEnd = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = activeCanvas.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }

    isDrawingRef.current = false;

    if (currentPointsRef.current.length > 0) {
      onStrokeComplete({
        points: [...currentPointsRef.current],
        color: penColor,
        width: penWidth,
      });
    }

    currentPointsRef.current = [];
  };

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] rounded-2xl overflow-hidden select-none border-2 border-dashed border-slate-300 hover:border-indigo-400 focus-within:border-indigo-500 transition-colors shadow-inner bg-white">
      {/* Background Grid Pattern or Checkerboard for Transparency */}
      {backgroundColor === 'transparent' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      )}

      {/* Signature Guide Line */}
      {showGuideLine && strokes.length === 0 && !isDrawingRef.current && (
        <div className="absolute inset-x-12 bottom-16 sm:bottom-20 flex items-center pointer-events-none transition-opacity duration-300">
          <span className="text-slate-400 font-serif italic text-lg sm:text-xl select-none mr-2">
            ✕
          </span>
          <div className="flex-1 border-b-2 border-slate-300 border-dotted" />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest ml-3 select-none">
            Sign on the line
          </span>
        </div>
      )}

      {/* Canvas Drawing Surface */}
      <canvas
        ref={activeCanvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className="relative w-full h-full cursor-crosshair touch-none block"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
