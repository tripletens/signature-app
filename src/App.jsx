import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import SignatureCanvas from './components/SignatureCanvas';
import ControlPanel from './components/ControlPanel';
import ExportPanel from './components/ExportPanel';
import SignatureTips from './components/SignatureTips';
import AdBanner from './components/AdBanner';
import LegalModal from './components/LegalModal';
import SponsorModal from './components/SponsorModal';
import { useSignatureHistory } from './hooks/useSignatureHistory';
import { ADSENSE_CONFIG } from './config/ads';

export default function App() {
  const canvasRef = useRef(null);
  const [penColor, setPenColor] = useState('#0f172a');
  const [penWidth, setPenWidth] = useState(3.5);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [legalModalType, setLegalModalType] = useState(null); // 'privacy' | 'terms' | null
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  const {
    strokes,
    addStroke,
    updateStrokesColor,
    updateStrokesWidth,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    isEmpty,
  } = useSignatureHistory();

  const handleColorChange = (newColor) => {
    setPenColor(newColor);
    updateStrokesColor(newColor);
  };

  const handleWidthChange = (newWidth) => {
    setPenWidth(newWidth);
    updateStrokesWidth(newWidth);
  };

  // Keyboard Shortcuts (Ctrl+Z / Cmd+Z for Undo, Ctrl+Y / Cmd+Shift+Z for Redo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!isCmdOrCtrl) return;

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-800">
      {/* Top Navigation */}
      <Header
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onClear={clear}
        isEmpty={isEmpty}
        onOpenSponsorModal={() => setIsSponsorModalOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        {/* Canvas & Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Drawing Canvas Area */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  Signature Canvas
                </h2>
                <span className="text-xs text-slate-400">
                  (Mouse, Stylus or Touch)
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {strokes.length} {strokes.length === 1 ? 'stroke' : 'strokes'}
              </span>
            </div>

            {/* Canvas Surface */}
            <div className="h-[360px] sm:h-[460px] w-full">
              <SignatureCanvas
                canvasRef={canvasRef}
                strokes={strokes}
                onStrokeComplete={addStroke}
                penColor={penColor}
                penWidth={penWidth}
                backgroundColor={backgroundColor}
                showGuideLine={true}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Shortcuts: <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 font-mono text-[10px] text-slate-700">⌘Z</kbd> Undo / <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 font-mono text-[10px] text-slate-700">⌘Y</kbd> Redo</span>
              <span>Smooth Bézier Curves & High-DPI Enabled</span>
            </div>
          </div>

          {/* Right Sidebar Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Ink & Style Panel */}
            <ControlPanel
              penColor={penColor}
              setPenColor={handleColorChange}
              penWidth={penWidth}
              setPenWidth={handleWidthChange}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />

            {/* Export & Download Actions */}
            <ExportPanel
              canvasRef={canvasRef}
              isEmpty={isEmpty}
              backgroundColor={backgroundColor}
            />
          </div>
        </div>

        {/* Sponsor Banner / Google AdSense / Call For Ads */}
        <AdBanner
          slotId={ADSENSE_CONFIG.slots.bottomBanner}
          onOpenSponsorModal={() => setIsSponsorModalOpen(true)}
        />

        {/* Format Guidance & Info Card */}
        <SignatureTips />
      </main>

      {/* Footer with Compliance & Sponsorship Links */}
      <footer className="border-t border-slate-200/80 py-6 text-center text-xs text-slate-400 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} SignCraft • Free Client-Side Signature Tool • Zero data stored on servers</p>
          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsSponsorModalOpen(true)}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              Advertise with Us
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-indigo-600 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-indigo-600 hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Legal Dialog Modal */}
      <LegalModal
        isOpen={Boolean(legalModalType)}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Sponsor & Call for Ads Modal */}
      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
}
