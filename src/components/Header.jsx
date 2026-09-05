import React from 'react';
import { PenTool, Undo2, Redo2, Trash2, ShieldCheck, Sparkles, Megaphone } from 'lucide-react';

export default function Header({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  isEmpty,
  onOpenSponsorModal,
}) {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 shadow-xs sticky top-0 z-30 backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <PenTool className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans']">
                SignCraft
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Free
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Draw, customize & download professional signatures in PNG, JPEG & JPG
            </p>
          </div>
        </div>

        {/* Quick Canvas Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenSponsorModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 transition-all cursor-pointer mr-1 active:scale-95"
          >
            <Megaphone className="w-3.5 h-3.5 text-indigo-600" />
            <span>Advertise</span>
          </button>

          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            aria-label="Undo last stroke"
            className="p-2 sm:px-3 sm:py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95"
          >
            <Undo2 className="w-4 h-4" />
            <span className="hidden md:inline">Undo</span>
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            aria-label="Redo stroke"
            className="p-2 sm:px-3 sm:py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-35 disabled:hover:bg-transparent transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95"
          >
            <Redo2 className="w-4 h-4" />
            <span className="hidden md:inline">Redo</span>
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

          <button
            onClick={onClear}
            disabled={isEmpty}
            title="Clear canvas"
            aria-label="Clear canvas"
            className="p-2 sm:px-3 sm:py-2 text-sm font-medium rounded-lg text-rose-600 hover:bg-rose-50 disabled:opacity-35 disabled:hover:bg-transparent transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden md:inline">Clear</span>
          </button>
        </div>
      </div>
    </header>
  );
}
