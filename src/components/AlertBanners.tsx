import React, { useState } from 'react';
import { Ban, Info, X } from 'lucide-react';

export const AlertBanners: React.FC = () => {
  const [showPlanningBanner, setShowPlanningBanner] = useState(true);

  return (
    <div className="space-y-4 mb-6">
      {/* Red Alert: Kitchen & bathroom services */}
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#df0000] p-4 rounded-sm shadow-xs flex items-start gap-3">
        <div className="text-[#df0000] pt-0.5 shrink-0">
          <Ban className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p className="font-bold text-gray-900 mb-0.5">Kitchen &amp; bathroom services</p>
          <p>
            For kitchen and bathroom installation services, please speak with a COMFY HOME co-worker at the
            respective departments in-store.{' '}
            <a href="#learn-more" onClick={(e) => e.preventDefault()} className="underline font-medium hover:text-gray-900">
              Learn more.
            </a>
          </p>
        </div>
      </div>

      {/* Blue Alert: Used our storage planning tools? */}
      {showPlanningBanner && (
        <div className="bg-white border border-gray-200 border-l-4 border-l-[#0077c8] p-4 rounded-sm shadow-xs flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="text-[#0077c8] pt-0.5 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p className="font-bold text-gray-900 mb-0.5">Used our storage planning tools?</p>
              <p>
                Remember to save your design and have your design code ready. Our assembly team will use it to
                install your order as planned.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPlanningBanner(false)}
            aria-label="Dismiss banner"
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
