import React from 'react';
import { HelpCircle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function SignatureTips() {
  return (
    <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-5 text-slate-700 flex flex-col gap-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
        Which format should you choose?
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> PNG (Recommended)
          </div>
          <p className="text-slate-500 leading-relaxed">
            Perfect for overlaying on digital contracts, Word docs, and PDFs because it supports transparency without a white box.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700" /> JPEG / JPG
          </div>
          <p className="text-slate-500 leading-relaxed">
            Best for systems requiring solid white background image files, email signatures, or standard compressed image uploads.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Auto-crop Feature
          </div>
          <p className="text-slate-500 leading-relaxed">
            Automatically trims excess whitespace around your signature so you don't have to manually crop it before pasting.
          </p>
        </div>
      </div>
    </div>
  );
}
