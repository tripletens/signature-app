import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            ) : (
              <FileText className="w-5 h-5 text-indigo-600" />
            )}
            <h3 className="font-bold text-slate-900 text-lg">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-4">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-800">Effective Date: September 2026</p>
              
              <h4 className="font-bold text-slate-900 text-base pt-2">1. Client-Side Processing & Data Privacy</h4>
              <p>
                SignCraft is built with a privacy-first architecture. All signature drawing, generation, and file exporting (PNG, JPEG, JPG) happen entirely inside your web browser. <strong>Your signatures and images are never transmitted to or stored on any external servers.</strong>
              </p>

              <h4 className="font-bold text-slate-900 text-base pt-2">2. Advertising & Third-Party Cookies</h4>
              <p>
                We use third-party advertising services (such as Google AdSense) to serve advertisements when you visit our website. These companies may use cookies, web beacons, and similar technologies to measure ad effectiveness and serve relevant advertisements based on your prior visits to this and other websites.
              </p>

              <h4 className="font-bold text-slate-900 text-base pt-2">4. Contact Information</h4>
              <p>
                If you have questions about this Privacy Policy, please contact us at: <a href="mailto:info@lythubtechnologies.com" className="text-indigo-600 underline">info@lythubtechnologies.com</a>
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">Effective Date: September 2026</p>

              <h4 className="font-bold text-slate-900 text-base pt-2">1. Use of Service</h4>
              <p>
                SignCraft provides a free tool for creating digital signature images for personal and professional use. You agree to use the service in compliance with all applicable local, national, and international laws.
              </p>

              <h4 className="font-bold text-slate-900 text-base pt-2">2. Disclaimer & No Legal Guarantee</h4>
              <p>
                The signatures generated with this tool are digital image representations. SignCraft does not provide legal advice regarding the validity or enforceability of digital signatures in specific legal jurisdictions.
              </p>

              <h4 className="font-bold text-slate-900 text-base pt-2">3. Intellectual Property</h4>
              <p>
                You retain full ownership and intellectual property rights over any signatures and images you create with SignCraft.
              </p>

              <h4 className="font-bold text-slate-900 text-base pt-2">4. Contact</h4>
              <p>
                For questions regarding these Terms, contact <a href="mailto:info@lythubtechnologies.com" className="text-indigo-600 underline">info@lythubtechnologies.com</a>
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
