import React, { useState } from 'react';
import { Download, Copy, Check, Sparkles, Crop, Settings2, FileImage } from 'lucide-react';
import { createExportCanvas, triggerDownload, copyToClipboard } from '../utils/canvasExport';

export default function ExportPanel({
  canvasRef,
  isEmpty,
  backgroundColor,
}) {
  const [cropWhitespace, setCropWhitespace] = useState(true);
  const [scale, setScale] = useState(2); // 2x HD default
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [customFilename, setCustomFilename] = useState('my-signature');

  const handleDownload = async (format) => {
    if (isEmpty || !canvasRef.current) return;
    setIsExporting(true);

    try {
      const ext = format.toLowerCase();
      const sanitizedName = customFilename.trim() || 'my-signature';
      const filename = `${sanitizedName}.${ext}`;

      const { dataUrl } = await createExportCanvas({
        sourceCanvas: canvasRef.current,
        format: ext,
        backgroundColor: backgroundColor,
        cropWhitespace: cropWhitespace,
        scale: scale,
        quality: 0.95,
      });

      triggerDownload(dataUrl, filename);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (isEmpty || !canvasRef.current) return;
    setCopied(true);
    await copyToClipboard(canvasRef.current);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5 text-indigo-600" />
          Export & Download
        </h3>
        <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
          Ready for PDF & Docs
        </span>
      </div>

      {/* Main Download Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* PNG Button */}
        <button
          onClick={() => handleDownload('png')}
          disabled={isEmpty || isExporting}
          className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white text-indigo-950 transition-all shadow-xs hover:shadow-md hover:shadow-indigo-500/20 disabled:opacity-40 disabled:hover:bg-indigo-50/50 disabled:hover:text-indigo-950 disabled:cursor-not-allowed cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileImage className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
            <span className="font-bold text-sm tracking-wide">PNG</span>
          </div>
          <span className="text-[11px] text-indigo-700/80 group-hover:text-indigo-100 transition-colors">
            {backgroundColor === 'transparent' ? 'Transparent Alpha' : 'Lossless Quality'}
          </span>
        </button>

        {/* JPEG Button */}
        <button
          onClick={() => handleDownload('jpeg')}
          disabled={isEmpty || isExporting}
          className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-900 hover:text-white text-slate-900 transition-all shadow-xs hover:shadow-md disabled:opacity-40 disabled:hover:bg-slate-50/70 disabled:hover:text-slate-900 disabled:cursor-not-allowed cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileImage className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            <span className="font-bold text-sm tracking-wide">JPEG</span>
          </div>
          <span className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">
            Solid White Background
          </span>
        </button>

        {/* JPG Button */}
        <button
          onClick={() => handleDownload('jpg')}
          disabled={isEmpty || isExporting}
          className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-900 hover:text-white text-slate-900 transition-all shadow-xs hover:shadow-md disabled:opacity-40 disabled:hover:bg-slate-50/70 disabled:hover:text-slate-900 disabled:cursor-not-allowed cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileImage className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            <span className="font-bold text-sm tracking-wide">JPG</span>
          </div>
          <span className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">
            Standard JPG Extension
          </span>
        </button>
      </div>

      {/* Secondary Actions & Options */}
      <div className="pt-2 flex flex-col gap-3 border-t border-slate-100">
        {/* Filename & Copy to Clipboard */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              placeholder="Filename"
              className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          <button
            onClick={handleCopyClipboard}
            disabled={isEmpty}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Image</span>
              </>
            )}
          </button>
        </div>

        {/* Advanced Options Bar: Auto-crop + Resolution Scale */}
        <div className="flex items-center justify-between pt-1 text-xs text-slate-600 flex-wrap gap-2">
          {/* Auto Crop Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={cropWhitespace}
              onChange={(e) => setCropWhitespace(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 w-4 h-4 cursor-pointer accent-indigo-600"
            />
            <span className="flex items-center gap-1 font-medium">
              <Crop className="w-3 h-3 text-slate-500" /> Auto-crop whitespace
            </span>
          </label>

          {/* Resolution Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Resolution:</span>
            {[
              { label: '1x', value: 1 },
              { label: '2x HD', value: 2 },
              { label: '3x Ultra', value: 3 },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setScale(r.value)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  scale === r.value
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
