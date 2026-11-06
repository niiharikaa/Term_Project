import React from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import {
  CartItem,
  DeliveryMethod,
  LiftAccessOption,
  AnchoringOption,
  calculateCheckoutTotals,
  formatPrice,
  PRODUCTS,
} from '../utils/pricing.ts';

interface DebriefModalProps {
  isOpen: boolean;
  onRestart: () => void;
  selectedPayment: string;
  variant: 'A' | 'B';
  items: CartItem[];
  deliveryMethod: DeliveryMethod | null;
  assemblySelected: boolean;
  liftAccess?: LiftAccessOption | null;
  anchoringChoice?: AnchoringOption | null;
}

export const DebriefModal: React.FC<DebriefModalProps> = ({
  isOpen,
  onRestart,
  selectedPayment,
  variant,
  items,
  deliveryMethod,
  assemblySelected,
  liftAccess = null,
  anchoringChoice = null,
}) => {
  if (!isOpen) return null;

  const checkoutTotals = calculateCheckoutTotals(
    items,
    'payment',
    deliveryMethod,
    assemblySelected,
    variant,
    liftAccess,
    anchoringChoice
  );

  const hasBookcase = items.some((item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="debrief-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-gray-100 my-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0058a3]">Study Complete</span>
          <h2 id="debrief-title" className="text-2xl font-bold text-gray-900">
            Experiment Debrief
          </h2>
          <p className="text-sm text-gray-600">
            Thank you for completing the checkout process for our SMU term paper.
          </p>
        </div>

        {/* Experiment key disclosure box */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-4 space-y-2 text-xs sm:text-sm text-gray-800">
          <p className="font-bold text-amber-950 flex items-center gap-1.5">
            <span>Nothing was ordered &bull; No payment was charged &bull; Brand is fictional</span>
          </p>
          <p className="text-gray-700">
            The brand <strong>&quot;COMFY HOME&quot;</strong> is completely fictional and used strictly as a simulated
            retail environment. No financial information was collected or transmitted.
          </p>
          <p className="text-gray-800 pt-1.5 border-t border-amber-200/60 leading-relaxed font-medium">
            {variant === 'B'
              ? `In a real order to a 3rd-floor flat with no lift, a $20 no-lift charge would also be paid to the driver – this checkout showed it when selected. You saw variant B.`
              : `In a real order to a 3rd-floor flat with no lift, a $20 no-lift charge would also be paid to the driver – this checkout did not show it. You saw variant A.`}
          </p>
          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
            <span className="font-semibold text-gray-900">Your experimental condition:</span>
            <span className="bg-[#0058a3] text-white font-mono px-2.5 py-0.5 rounded text-xs font-bold">
              You saw variant {variant}
            </span>
          </div>
        </div>

        {/* Session summary */}
        <div className="border border-gray-200 rounded-lg p-4 text-xs space-y-2 bg-gray-50 text-gray-700">
          <div className="font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">Simulated Order Details</div>
          <div className="flex justify-between">
            <span className="text-gray-600">Items tested:</span>
            <span className="font-medium text-gray-900">
              {items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Selected payment method:</span>
            <span className="font-medium text-gray-900">{selectedPayment}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery service:</span>
            <span className="font-medium text-gray-900">
              {deliveryMethod === 'truck'
                ? (variant === 'B' ? 'Truck delivery ($35)' : 'Truck delivery ($35)')
                : deliveryMethod === 'parcel'
                ? 'Parcel delivery ($10)'
                : deliveryMethod === 'collect'
                ? 'Click & collect ($10)'
                : 'None'}
            </span>
          </div>

          {/* Variant B specific details */}
          {variant === 'B' && hasBookcase && liftAccess && (
            <div className="flex justify-between">
              <span className="text-gray-600">Lift access response:</span>
              <span className="font-medium text-gray-900">
                {liftAccess === 'no-lift-3-5'
                  ? 'No lift, floor 3–5 (+$20 charge added)'
                  : liftAccess === 'no-lift-1-2'
                  ? 'No lift, floor 1–2 ($0)'
                  : 'Lift ($0)'}
              </span>
            </div>
          )}

          {hasBookcase && (assemblySelected || anchoringChoice === 'assembly') && (
            <div className="flex justify-between">
              <span className="text-gray-600">Assembly &amp; anchoring:</span>
              <span className="font-medium text-gray-900">Selected (+$8.90)</span>
            </div>
          )}

          {variant === 'B' && hasBookcase && anchoringChoice === 'self' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Anchoring plan:</span>
              <span className="font-medium text-gray-900">I&apos;ll anchor it myself (kit included)</span>
            </div>
          )}

          <div className="flex justify-between border-t border-gray-200 pt-1.5 font-bold text-gray-900 text-sm">
            <span>Simulated total:</span>
            <span>{formatPrice(checkoutTotals.total)}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0058a3] hover:bg-[#004f93] text-white font-bold rounded-full text-sm transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset / Test Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
