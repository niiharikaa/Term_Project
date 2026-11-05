import React from 'react';

export const ComfyHomeLogo: React.FC<{ className?: string; isCheckout?: boolean }> = ({
  className = 'h-9',
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center bg-[#0058a3] px-3.5 py-1.5 rounded-sm select-none ${className}`}
      aria-label="COMFY HOME"
      role="img"
    >
      <div className="bg-[#ffdb00] rounded-[50%] px-2.5 py-0.5 flex items-center justify-center">
        <span className="font-black text-[#0058a3] tracking-wider text-sm sm:text-base leading-none font-sans uppercase">
          COMFY HOME
        </span>
      </div>
    </div>
  );
};

export const LumaLampSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <svg viewBox="0 0 160 160" className={`bg-[#f4f4f4] rounded ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fff3d1" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#8c99a6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3d4852" stopOpacity="0.9" />
        </radialGradient>
        <linearGradient id="metalBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="40%" stopColor="#f3f4f6" />
          <stop offset="70%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#6b7280" />
        </linearGradient>
      </defs>
      {/* Background shadow */}
      <ellipse cx="80" cy="148" rx="46" ry="7" fill="#000000" fillOpacity="0.12" />
      {/* Power cord */}
      <path d="M102 135 C125 137, 138 143, 155 142" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
      {/* Nickel Base */}
      <rect x="62" y="112" width="36" height="32" rx="3" fill="url(#metalBase)" stroke="#4b5563" strokeWidth="1" />
      <ellipse cx="80" cy="112" rx="18" ry="3.5" fill="#e5e7eb" stroke="#6b7280" strokeWidth="0.8" />
      <ellipse cx="80" cy="144" rx="18" ry="3.5" fill="#4b5563" />
      {/* Inner Bulb & stem */}
      <rect x="77" y="78" width="6" height="34" fill="#9ca3af" />
      <circle cx="80" cy="74" r="12" fill="#fef08a" fillOpacity="0.85" />
      <circle cx="80" cy="74" r="6" fill="#ffffff" />
      {/* Smoked glass cloche dome */}
      <ellipse cx="80" cy="80" rx="36" ry="38" fill="url(#lampGlow)" stroke="#4b5563" strokeWidth="1.5" />
      {/* Top finial / cap */}
      <rect x="70" y="42" width="20" height="7" rx="2" fill="url(#metalBase)" stroke="#4b5563" strokeWidth="1" />
      <ellipse cx="80" cy="42" rx="10" ry="2.5" fill="#f3f4f6" />
      {/* Glass reflections */}
      <path d="M52 75 A30 32 0 0 1 74 48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
};

export const ArloBookcaseSvg: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <svg viewBox="0 0 160 160" className={`bg-[#f4f4f4] rounded ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bookcaseFace" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <linearGradient id="interiorShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="25%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      {/* Cast Shadow */}
      <polygon points="56,150 110,150 120,154 50,154" fill="#000000" fillOpacity="0.08" />
      {/* Main outer frame */}
      <rect x="58" y="16" width="44" height="132" rx="1.5" fill="url(#bookcaseFace)" stroke="#d1d5db" strokeWidth="1.2" />
      {/* Interior depth */}
      <rect x="62" y="20" width="36" height="122" fill="url(#interiorShadow)" />
      {/* Shelves (6 tiers) */}
      <line x1="62" y1="41" x2="98" y2="41" stroke="#d1d5db" strokeWidth="2.5" />
      <line x1="62" y1="62" x2="98" y2="62" stroke="#d1d5db" strokeWidth="2.5" />
      <line x1="62" y1="83" x2="98" y2="83" stroke="#d1d5db" strokeWidth="2.5" />
      <line x1="62" y1="104" x2="98" y2="104" stroke="#d1d5db" strokeWidth="2.5" />
      <line x1="62" y1="125" x2="98" y2="125" stroke="#d1d5db" strokeWidth="2.5" />
      {/* Plinth kickboard at base */}
      <rect x="58" y="142" width="44" height="6" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="0.8" />
      {/* Subtle depth line on left vertical upright */}
      <line x1="62" y1="20" x2="62" y2="142" stroke="#9ca3af" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Subtle depth line on right vertical upright */}
      <line x1="98" y1="20" x2="98" y2="142" stroke="#9ca3af" strokeWidth="0.8" strokeOpacity="0.4" />
    </svg>
  );
};

export const PaymentMethodLogos: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-3" aria-label="Accepted payment methods">
      {/* VISA */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[10px] font-black italic tracking-wider text-blue-900 bg-white">
        VISA
      </span>
      {/* Mastercard */}
      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 border border-gray-300 rounded bg-white">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block -mr-1"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block opacity-90"></span>
      </span>
      {/* AMEX */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[9px] font-extrabold bg-[#006fcf] text-white">
        AMEX
      </span>
      {/* eNETS */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[9px] font-bold text-red-600 bg-white">
        e<span className="text-blue-700">NETS</span>
      </span>
      {/* atome */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[9px] font-bold text-emerald-700 bg-white">
        atome
      </span>
      {/* Grab */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[9px] font-extrabold text-green-600 bg-white">
        Grab
      </span>
      {/* GPay */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-300 rounded text-[9px] font-semibold text-gray-700 bg-white">
        GPay
      </span>
      {/* 0% Instalment */}
      <span className="inline-flex items-center justify-center px-1.5 py-0.5 border border-dashed border-gray-400 rounded text-[9px] text-gray-500 bg-white">
        0%
      </span>
    </div>
  );
};
