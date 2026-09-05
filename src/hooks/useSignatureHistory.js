import { useState, useCallback } from 'react';

export function useSignatureHistory() {
  const [strokes, setStrokes] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addStroke = useCallback((stroke) => {
    setStrokes((prev) => {
      // Truncate any future redo history when a new stroke is added
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, stroke];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const updateStrokesColor = useCallback((newColor) => {
    setStrokes((prev) =>
      prev.map((stroke) => ({
        ...stroke,
        color: newColor,
      }))
    );
  }, []);

  const updateStrokesWidth = useCallback((newWidth) => {
    setStrokes((prev) =>
      prev.map((stroke) => ({
        ...stroke,
        width: newWidth,
      }))
    );
  }, []);

  const undo = useCallback(() => {
    if (historyIndex >= 0) {
      setHistoryIndex((prev) => prev - 1);
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < strokes.length - 1) {
      setHistoryIndex((prev) => prev + 1);
    }
  }, [historyIndex, strokes.length]);

  const clear = useCallback(() => {
    setStrokes([]);
    setHistoryIndex(-1);
  }, []);

  const activeStrokes = strokes.slice(0, historyIndex + 1);
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < strokes.length - 1;
  const isEmpty = activeStrokes.length === 0;

  return {
    strokes: activeStrokes,
    addStroke,
    updateStrokesColor,
    updateStrokesWidth,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    isEmpty,
  };
}
