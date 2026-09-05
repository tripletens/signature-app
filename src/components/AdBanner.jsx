import React, { useEffect, useRef } from 'react';
import { ADSENSE_CONFIG, CUSTOM_SPONSOR_CONFIG } from '../config/ads';
import CustomAdBanner from './CustomAdBanner';
import CallForAdsBanner from './CallForAdsBanner';

export default function AdBanner({
  slotId,
  mode = ADSENSE_CONFIG.mode,
  onOpenSponsorModal,
  className = '',
}) {
  const adRef = useRef(null);
  const isDev = !ADSENSE_CONFIG.client || ADSENSE_CONFIG.client.includes('XXXXXXXX');

  useEffect(() => {
    if (mode === 'google' && !isDev) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.warn('AdSense notice:', e.message);
      }
    }
  }, [mode, isDev]);

  // 1. Custom Sponsor Banner Mode
  if (mode === 'custom' && CUSTOM_SPONSOR_CONFIG.enabled) {
    return (
      <div className={`my-4 ${className}`}>
        <CustomAdBanner onOpenSponsorModal={onOpenSponsorModal} />
      </div>
    );
  }

  // 2. Call for Adverts Mode
  if (mode === 'call_for_ads') {
    return (
      <div className={`my-4 ${className}`}>
        <CallForAdsBanner onOpenSponsorModal={onOpenSponsorModal} />
      </div>
    );
  }

  // 3. Google AdSense Mode
  return (
    <div className={`w-full flex justify-center items-center my-4 overflow-hidden ${className}`}>
      {isDev ? (
        <div className="w-full max-w-4xl min-h-[80px] border border-dashed border-slate-300 rounded-2xl bg-slate-50/80 flex flex-col items-center justify-center p-3 text-slate-400 select-none">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
            Google AdSense Unit Placeholder
          </span>
          <p className="text-xs text-slate-500 text-center">
            Configure your AdSense client ID in <code className="text-indigo-600 font-mono bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">src/config/ads.js</code>
          </p>
        </div>
      ) : (
        <div ref={adRef} className="w-full max-w-4xl text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADSENSE_CONFIG.client}
            data-ad-slot={slotId || ADSENSE_CONFIG.slots.bottomBanner}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  );
}
