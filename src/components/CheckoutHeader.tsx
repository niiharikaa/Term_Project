import React from 'react';
import { User, Truck, CreditCard, Check } from 'lucide-react';
import { ComfyHomeLogo } from './ProductThumbnails.tsx';

export type CheckoutStep = 'details' | 'services' | 'payment';

interface CheckoutHeaderProps {
  currentStep: CheckoutStep;
  onGoToCart?: () => void;
  onStepClick?: (step: CheckoutStep) => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  currentStep,
  onGoToCart,
  onStepClick,
}) => {
  const steps: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: 'details', label: 'Details', icon: <User className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Truck className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const getStepStatus = (stepId: CheckoutStep) => {
    if (stepId === currentStep) return 'active';
    if (currentStep === 'payment') return 'completed';
    if (currentStep === 'services' && stepId === 'details') return 'completed';
    return 'inactive';
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <button
          type="button"
          onClick={onGoToCart}
          className="cursor-pointer focus:outline-none"
          aria-label="Back to Cart"
        >
          <ComfyHomeLogo />
        </button>

        {/* Center: Stepper */}
        <nav aria-label="Checkout progress" className="flex items-center gap-3 sm:gap-6">
          {steps.map((step, idx) => {
            const status = getStepStatus(step.id);
            const isClickable =
              status === 'completed' ||
              (step.id === 'details' && currentStep !== 'details') ||
              (step.id === 'services' && currentStep === 'payment');

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 ${
                      status === 'active' || status === 'completed' ? 'bg-gray-400' : 'bg-gray-200'
                    }`}
                  />
                )}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(step.id)}
                  className={`flex flex-col items-center gap-1.5 focus:outline-none ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  aria-current={status === 'active' ? 'step' : undefined}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      status === 'active'
                        ? 'bg-[#0058a3] text-white shadow-sm'
                        : status === 'completed'
                        ? 'text-[#0058a3] border border-[#0058a3] bg-blue-50/50'
                        : 'border border-gray-300 text-gray-400 bg-white'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      status === 'active'
                        ? 'text-gray-900 font-bold'
                        : status === 'completed'
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Spacer for centering */}
        <div className="hidden sm:block w-28" />
      </div>
    </header>
  );
};
