import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CartItem } from '../utils/pricing.ts';
import { AlertBanners } from './AlertBanners.tsx';
import { RightSidebar } from './RightSidebar.tsx';

interface DetailsViewProps {
  items: CartItem[];
  onContinue: () => void;
  onEditProductInCart: () => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  items,
  onContinue,
  onEditProductInCart,
}) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Main form column */}
        <div className="flex-1 w-full max-w-2xl">
          <AlertBanners />

          <div className="space-y-6 pt-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Please enter your delivery details</h1>
              <p className="text-sm text-gray-600 mt-2">
                Delivery details will be used in the next step to find the best delivery options.
              </p>
              <p className="text-xs text-gray-500 mt-4">
                Fields marked <span className="text-red-600 font-bold">*</span> are required
              </p>
            </div>

            {/* Delivery Details Form - pre-filled with fictional values and disabled as required */}
            <form onSubmit={(e) => { e.preventDefault(); onContinue(); }} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-900 mb-1">
                  <span className="text-red-600">*</span> Email
                </label>
                <input
                  id="email"
                  type="email"
                  value="alex.tan@fictional-domain.sg"
                  disabled
                  className="w-full px-3.5 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed select-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">Used for order confirmation and updates</p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-xs font-bold text-gray-900 mb-1">
                  <span className="text-red-600">*</span> Full name
                </label>
                <input
                  id="fullname"
                  type="text"
                  value="Alex Tan"
                  disabled
                  className="w-full px-3.5 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed select-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">Complete name of the person receiving the order</p>
              </div>

              {/* Phone number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-gray-900 mb-1">
                  <span className="text-red-600">*</span> Phone number
                </label>
                <div className="flex gap-2">
                  <div className="w-28 shrink-0">
                    <select
                      disabled
                      className="w-full px-3 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed"
                    >
                      <option>SG (+65)</option>
                    </select>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value="9123 4567"
                    disabled
                    className="flex-1 px-3.5 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed select-none"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Used for order updates and delivery contact</p>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-bold text-gray-900 mb-1">
                  <span className="text-red-600">*</span> Address
                </label>
                <input
                  id="address"
                  type="text"
                  value="12 Orchard Boulevard, #08-01"
                  disabled
                  className="w-full px-3.5 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed select-none"
                />
              </div>

              {/* Postal code */}
              <div>
                <label htmlFor="postal" className="block text-xs font-bold text-gray-900 mb-1">
                  <span className="text-red-600">*</span> Postal code
                </label>
                <input
                  id="postal"
                  type="text"
                  value="248641"
                  disabled
                  className="w-full sm:w-48 px-3.5 py-3 border border-gray-300 rounded-sm bg-gray-100 text-gray-700 text-sm cursor-not-allowed select-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0058a3] hover:bg-[#004f93] text-white font-bold rounded-full text-base transition-colors shadow-sm cursor-pointer"
                >
                  <span>Continue to services</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right sidebar */}
        <RightSidebar
          view="details"
          items={items}
          onEditProductInCart={onEditProductInCart}
        />
      </div>
    </div>
  );
};
