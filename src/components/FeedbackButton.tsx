import React from 'react';
import { Smile } from 'lucide-react';

export const FeedbackButton: React.FC = () => {
  return (
    <aside aria-label="Feedback" className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        aria-label="Give feedback"
        className="w-12 h-12 rounded-full bg-[#ffdb00] text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer border border-amber-300"
      >
        <Smile className="w-7 h-7 stroke-[2]" />
      </button>
    </aside>
  );
};
