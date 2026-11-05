import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onAgree: () => void;
  variant: string;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAgree, variant }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#0058a3] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0058a3]">SMU Term Project Experiment</span>
            <h2 id="consent-title" className="text-xl font-bold text-gray-900">
              Participant Information &amp; Consent
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#0058a3] shrink-0 mt-0.5" />
            <p className="font-semibold text-gray-900">
              Class prototype &ndash; no real order, no payment, no personal data
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
            <li>
              You are participating in a student academic study on online shopping and checkout behavior.
            </li>
            <li>
              The store brand <strong>COMFY HOME</strong> is purely fictional.
            </li>
            <li>
              No actual purchases, transactions, or card charges will occur.
            </li>
            <li>
              All shipping address fields in checkout are fictional pre-filled placeholders.
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-500">
          By clicking &quot;I Understand &amp; Continue&quot;, you acknowledge that this is a simulated academic prototype.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onAgree}
            className="w-full sm:w-auto px-6 py-3 bg-[#0058a3] hover:bg-[#004f93] text-white font-bold rounded-full text-sm transition-colors shadow-sm cursor-pointer"
          >
            I Understand &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
