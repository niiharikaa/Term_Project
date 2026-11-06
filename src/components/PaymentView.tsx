import React from 'react';
import { CreditCard, ChevronLeft, Calendar } from 'lucide-react';
import { CartItem, DeliveryMethod, LiftAccessOption, AnchoringOption } from '../utils/pricing.ts';
import { AlertBanners } from './AlertBanners.tsx';
import { RightSidebar } from './RightSidebar.tsx';

interface PaymentViewProps {
  items: CartItem[];
  variant?: 'A' | 'B';
  liftAccess?: LiftAccessOption | null;
  anchoringChoice?: AnchoringOption | null;
  deliveryMethod: DeliveryMethod | null;
  assemblySelected: boolean;
  onSelectPayment: (method: string) => void;
  onBackToServices: () => void;
  onEditProductInCart: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  items,
  variant = 'A',
  liftAccess = null,
  anchoringChoice = null,
  deliveryMethod,
  assemblySelected,
  onSelectPayment,
  onBackToServices,
  onEditProductInCart,
}) => {
  const paymentMethods = [
    {
      id: 'card',
      title: 'Debit/Credit card',
      subtitle: 'Visa, Mastercard, Amex',
      icon: <CreditCard className="w-6 h-6 text-gray-800" />,
      disabled: false,
    },
    {
      id: 'gpay',
      title: 'Google Pay',
      subtitle: '',
      badge: (
        <span className="inline-flex items-center px-2 py-0.5 border border-gray-300 rounded text-xs font-bold text-gray-700 bg-white">
          GPay
        </span>
      ),
      disabled: false,
    },
    {
      id: 'atome',
      title: 'Atome',
      subtitle: '',
      badge: (
        <span className="inline-flex items-center px-2 py-0.5 border border-gray-300 rounded text-xs font-bold text-emerald-700 bg-white">
          atome
        </span>
      ),
      disabled: false,
    },
    {
      id: 'grab',
      title: 'GrabPay / PayLater by Grab',
      subtitle: '',
      badge: (
        <span className="inline-flex items-center px-2 py-0.5 border border-gray-300 rounded text-xs font-extrabold text-green-600 bg-white">
          Grab
        </span>
      ),
      disabled: false,
    },
    {
      id: 'enets',
      title: 'eNETS',
      subtitle: '',
      badge: (
        <span className="inline-flex items-center px-2 py-0.5 border border-gray-300 rounded text-xs font-bold text-red-600 bg-white">
          e<span className="text-blue-700">NETS</span>
        </span>
      ),
      disabled: false,
    },
    {
      id: 'instalment',
      title: 'Instalment plan',
      subtitle: 'Only allowed by an order value of at least $250',
      icon: <Calendar className="w-5 h-5 text-gray-400" />,
      disabled: true,
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Main column */}
        <div className="flex-1 w-full max-w-2xl">
          <AlertBanners />

          <div className="space-y-6 pt-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">How would you like to pay?</h1>
            </div>

            {/* Payment method cards */}
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                if (method.disabled) {
                  return (
                    <div
                      key={method.id}
                      className="p-5 rounded-md border border-gray-200 bg-gray-50/80 opacity-60 cursor-not-allowed flex items-center justify-between"
                      aria-disabled="true"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 shrink-0 flex items-center justify-center">{method.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-gray-600">{method.title}</p>
                          {method.subtitle && (
                            <p className="text-xs text-gray-500 mt-0.5">{method.subtitle}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => onSelectPayment(method.title)}
                    className="w-full p-5 rounded-md border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50/50 transition-all text-left flex items-center justify-between shadow-2xs hover:shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0058a3]"
                  >
                    <div className="flex items-center gap-4">
                      {method.icon && <div className="w-8 shrink-0 flex items-center justify-center">{method.icon}</div>}
                      {method.badge && <div className="w-12 shrink-0 flex items-center">{method.badge}</div>}
                      <div>
                        <p className="text-sm font-bold text-gray-900">{method.title}</p>
                        {method.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5">{method.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={onBackToServices}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to services</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <RightSidebar
          view="payment"
          items={items}
          deliveryMethod={deliveryMethod}
          assemblySelected={assemblySelected}
          variant={variant}
          liftAccess={liftAccess}
          anchoringChoice={anchoringChoice}
          onEditProductInCart={onEditProductInCart}
        />
      </div>
    </div>
  );
};
