import React from 'react';
import { Megaphone, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function CallForAdsBanner({ onOpenSponsorModal, className = '' }) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 shadow-sm relative ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/10">
            <Megaphone className="w-5 h-5 -rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Ad Space Available
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">Reach thousands of professionals daily</span>
            </div>
            <h4 className="font-bold text-white text-sm mt-0.5">
              Promote Your Brand, SaaS or Product on SignCraft
            </h4>
          </div>
        </div>

        {/* Right CTA */}
        <button
          onClick={onOpenSponsorModal}
          className="self-end sm:self-center px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Sponsor / Advertise</span>
          <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
}
