import React, { useState } from 'react';
import { X, Megaphone, Users, Eye, ArrowUpRight, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { CUSTOM_SPONSOR_CONFIG } from '../config/ads';

export default function SponsorModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const email = CUSTOM_SPONSOR_CONFIG.advertiseWithUs.contactEmail;

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-indigo-100 mb-1.5 backdrop-blur-xs">
              <Megaphone className="w-3 h-3 text-amber-300" /> Sponsor & Advertise
            </span>
            <h3 className="text-xl font-bold tracking-tight">
              Reach High-Intent Business Users
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed">
          {/* Stats & Audience Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-base mb-0.5">
                <Eye className="w-4 h-4 text-indigo-600" />
                {CUSTOM_SPONSOR_CONFIG.advertiseWithUs.monthlyImpressions}
              </div>
              <p className="text-xs text-indigo-700/80 font-medium">Monthly Active Impressions</p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-0.5">
                <Users className="w-4 h-4 text-slate-700" />
                Target Audience
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {CUSTOM_SPONSOR_CONFIG.advertiseWithUs.targetAudience}
              </p>
            </div>
          </div>

          {/* Ad Formats Offered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
              Available Ad Placements
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-200/80 bg-white flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Premium Leaderboard Banner</div>
                  <div className="text-[11px] text-slate-500">High-visibility placement directly above/below the signature canvas.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/80 bg-white flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Featured Partner Spotlight</div>
                  <div className="text-[11px] text-slate-500">Custom branded sponsor card with custom CTA button and direct link.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry / Booking CTA Box */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-300">Direct Sponsorship Contact</span>
                <p className="font-mono text-xs text-indigo-300 font-semibold">{email}</p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>

            <a
              href={`mailto:${email}?subject=SignCraft Sponsorship Inquiry&body=Hi, I am interested in advertising on SignCraft.`}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Send Sponsorship Inquiry <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
