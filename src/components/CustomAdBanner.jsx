import React from 'react';
import { Megaphone, ExternalLink, Sparkles } from 'lucide-react';
import { CUSTOM_SPONSOR_CONFIG } from '../config/ads';

export default function CustomAdBanner({ onOpenSponsorModal, className = '' }) {
  const { sponsor } = CUSTOM_SPONSOR_CONFIG;

  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/70 p-4 shadow-xs relative ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Sponsor Details */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-100/80 text-indigo-800 border border-indigo-200/60">
                {sponsor.badge || 'Sponsored'}
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{sponsor.name}</h4>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              {sponsor.tagline}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
          <button
            onClick={onOpenSponsorModal}
            className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 hover:underline px-2 py-1 transition-colors cursor-pointer"
          >
            Advertise here
          </button>

          <a
            href={sponsor.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>{sponsor.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
