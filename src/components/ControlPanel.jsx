import React from 'react';
import { Palette, Layers, Sliders, Check } from 'lucide-react';

const PEN_COLORS = [
  { name: 'Black', value: '#0f172a', preview: 'bg-slate-900' },
  { name: 'Royal Blue', value: '#1d4ed8', preview: 'bg-blue-700' },
  { name: 'Classic Navy', value: '#1e3a8a', preview: 'bg-blue-950' },
  { name: 'Emerald', value: '#047857', preview: 'bg-emerald-700' },
  { name: 'Crimson', value: '#be123c', preview: 'bg-rose-700' },
  { name: 'Purple', value: '#6d28d9', preview: 'bg-purple-700' },
];

const PEN_WIDTHS = [
  { label: 'Fine', value: 2 },
  { label: 'Medium', value: 3.5 },
  { label: 'Bold', value: 5.5 },
  { label: 'Calligraphy', value: 8 },
];

const BACKGROUND_OPTIONS = [
  { label: 'Transparent', value: 'transparent', preview: 'border-slate-300 bg-white' },
  { label: 'Solid White', value: '#ffffff', preview: 'bg-white border-slate-200 shadow-xs' },
  { label: 'Parchment', value: '#fef3c7', preview: 'bg-amber-100/70 border-amber-200' },
  { label: 'Light Gray', value: '#f1f5f9', preview: 'bg-slate-100 border-slate-200' },
  { label: 'Dark Navy', value: '#0f172a', preview: 'bg-slate-900 border-slate-800' },
];

export default function ControlPanel({
  penColor,
  setPenColor,
  penWidth,
  setPenWidth,
  backgroundColor,
  setBackgroundColor,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col gap-5">
      {/* Pen Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            Ink Color
          </label>
          <span className="text-xs font-mono text-slate-400 uppercase">{penColor}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {PEN_COLORS.map((c) => {
            const isSelected = penColor.toLowerCase() === c.value.toLowerCase();
            return (
              <button
                key={c.value}
                onClick={() => setPenColor(c.value)}
                title={c.name}
                className={`relative w-8 h-8 rounded-full ${c.preview} transition-transform flex items-center justify-center cursor-pointer ${
                  isSelected ? 'scale-110 ring-2 ring-indigo-500 ring-offset-2' : 'hover:scale-105'
                }`}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-sm" />}
              </button>
            );
          })}

          {/* Custom Color Picker input */}
          <div className="relative group">
            <input
              type="color"
              value={penColor}
              onChange={(e) => setPenColor(e.target.value)}
              className="opacity-0 absolute inset-0 w-8 h-8 cursor-pointer z-10"
              title="Choose custom ink color"
            />
            <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
              <span className="text-xs font-bold">+</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Stroke Thickness */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            Stroke Width
          </label>
          <span className="text-xs font-semibold text-slate-600">{penWidth}px</span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-3">
          {PEN_WIDTHS.map((w) => {
            const isSelected = penWidth === w.value;
            return (
              <button
                key={w.value}
                onClick={() => setPenWidth(w.value)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Fine-tune Slider */}
        <input
          type="range"
          min="1"
          max="12"
          step="0.5"
          value={penWidth}
          onChange={(e) => setPenWidth(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <hr className="border-slate-100" />

      {/* Canvas Background Mode */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            Background
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BACKGROUND_OPTIONS.map((bg) => {
            const isSelected = backgroundColor === bg.value;
            return (
              <button
                key={bg.value}
                onClick={() => setBackgroundColor(bg.value)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-5 h-5 shrink-0 rounded-md border ${bg.preview} relative overflow-hidden`}
                >
                  {bg.value === 'transparent' && (
                    <div
                      className="w-full h-full opacity-60"
                      style={{
                        backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
                        backgroundSize: '5px 5px',
                        backgroundPosition: '0 0, 0 2.5px, 2.5px -2.5px, -2.5px 0px',
                      }}
                    />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 truncate">
                  {bg.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
