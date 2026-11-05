import React from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { CartItem, DeliveryMethod, PRODUCTS } from '../utils/pricing.ts';
import { ArloBookcaseSvg } from './ProductThumbnails.tsx';
import { AlertBanners } from './AlertBanners.tsx';
import { RightSidebar } from './RightSidebar.tsx';

interface ServicesViewProps {
  items: CartItem[];
  deliveryMethod: DeliveryMethod | null;
  onSelectDeliveryMethod: (method: DeliveryMethod) => void;
  assemblySelected: boolean;
  onToggleAssembly: (selected: boolean) => void;
  selectedDate: number;
  onSelectDate: (day: number) => void;
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
  onContinue: () => void;
  onBackToDetails: () => void;
  onEditProductInCart: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  items,
  deliveryMethod,
  onSelectDeliveryMethod,
  assemblySelected,
  onToggleAssembly,
  selectedDate,
  onSelectDate,
  selectedSlot,
  onSelectSlot,
  onContinue,
  onBackToDetails,
  onEditProductInCart,
}) => {
  const hasBookcase = items.some(
    (item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0
  );

  // November 2026 calendar days setup matching screenshot 06
  // Mo Tu We Th Fr Sa Su
  // Week 1: 26, 27, 28, 29, 30, 31, 1
  // Week 2: 2, 3, 4, 5, 6, 7, 8
  // Week 3: 9, [10], 11, 12, 13, 14, 15
  // Week 4: 16, 17, 18, 19, 20, 21, 22
  // Week 5: 23, 24, 25, 26, 27, 28, 29
  // Week 6: 30, 1, 2, 3, 4, 5, 6
  const calendarRows = [
    [
      { day: 26, isCurrentMonth: false, disabled: true },
      { day: 27, isCurrentMonth: false, disabled: true },
      { day: 28, isCurrentMonth: false, disabled: true },
      { day: 29, isCurrentMonth: false, disabled: true },
      { day: 30, isCurrentMonth: false, disabled: true },
      { day: 31, isCurrentMonth: false, disabled: true },
      { day: 1, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 2, isCurrentMonth: true, disabled: true },
      { day: 3, isCurrentMonth: true, disabled: true },
      { day: 4, isCurrentMonth: true, disabled: true },
      { day: 5, isCurrentMonth: true, disabled: true },
      { day: 6, isCurrentMonth: true, disabled: true },
      { day: 7, isCurrentMonth: true, disabled: true },
      { day: 8, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 9, isCurrentMonth: true, disabled: true },
      { day: 10, isCurrentMonth: true, disabled: false },
      { day: 11, isCurrentMonth: true, disabled: false },
      { day: 12, isCurrentMonth: true, disabled: false },
      { day: 13, isCurrentMonth: true, disabled: true },
      { day: 14, isCurrentMonth: true, disabled: true },
      { day: 15, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 16, isCurrentMonth: true, disabled: true },
      { day: 17, isCurrentMonth: true, disabled: true },
      { day: 18, isCurrentMonth: true, disabled: true },
      { day: 19, isCurrentMonth: true, disabled: true },
      { day: 20, isCurrentMonth: true, disabled: true },
      { day: 21, isCurrentMonth: true, disabled: true },
      { day: 22, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 23, isCurrentMonth: true, disabled: true },
      { day: 24, isCurrentMonth: true, disabled: true },
      { day: 25, isCurrentMonth: true, disabled: true },
      { day: 26, isCurrentMonth: true, disabled: true },
      { day: 27, isCurrentMonth: true, disabled: true },
      { day: 28, isCurrentMonth: true, disabled: true },
      { day: 29, isCurrentMonth: true, disabled: true },
    ],
    [
      { day: 30, isCurrentMonth: true, disabled: true },
      { day: 1, isCurrentMonth: false, disabled: true },
      { day: 2, isCurrentMonth: false, disabled: true },
      { day: 3, isCurrentMonth: false, disabled: true },
      { day: 4, isCurrentMonth: false, disabled: true },
      { day: 5, isCurrentMonth: false, disabled: true },
      { day: 6, isCurrentMonth: false, disabled: true },
    ],
  ];

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Main content column */}
        <div className="flex-1 w-full max-w-2xl">
          <AlertBanners />

          <div className="space-y-8 pt-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">How would you like to receive your order?</h1>
              <a href="#service-info" onClick={(e) => e.preventDefault()} className="text-xs text-gray-700 underline font-semibold mt-1 inline-block">
                Service info
              </a>
            </div>

            {/* Delivery Option Cards */}
            <div className="space-y-4">
              {/* Parcel Delivery - only when bookcase is not in cart (up to 15 kg) */}
              {!hasBookcase && (
                <div
                  onClick={() => onSelectDeliveryMethod('parcel')}
                  className={`p-5 rounded-md border-2 transition-all cursor-pointer flex justify-between items-center ${
                    deliveryMethod === 'parcel'
                      ? 'border-[#0058a3] bg-blue-50/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  role="radio"
                  aria-checked={deliveryMethod === 'parcel'}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onSelectDeliveryMethod('parcel')}
                >
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Parcel delivery</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Delivered within 3-5 working days</p>
                  </div>
                  <div className="text-base font-bold text-gray-950">$10</div>
                </div>
              )}

              {/* Click & Collect */}
              <div
                onClick={() => onSelectDeliveryMethod('collect')}
                className={`p-5 rounded-md border-2 transition-all cursor-pointer flex justify-between items-center ${
                  deliveryMethod === 'collect'
                    ? 'border-[#0058a3] bg-blue-50/20 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                role="radio"
                aria-checked={deliveryMethod === 'collect'}
                tabIndex={0}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onSelectDeliveryMethod('collect')}
              >
                <div>
                  <h3 className="text-base font-bold text-gray-900">Click &amp; collect</h3>
                  <p className="text-xs text-gray-600 mt-0.5">Select preferred collection date</p>
                </div>
                <div className="text-base font-bold text-gray-950">$10</div>
              </div>

              {/* Truck Delivery */}
              <div
                onClick={() => onSelectDeliveryMethod('truck')}
                className={`p-5 rounded-md border-2 transition-all cursor-pointer flex justify-between items-center ${
                  deliveryMethod === 'truck'
                    ? 'border-[#0058a3] bg-blue-50/20 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                role="radio"
                aria-checked={deliveryMethod === 'truck'}
                tabIndex={0}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && onSelectDeliveryMethod('truck')}
              >
                <div>
                  <h3 className="text-base font-bold text-gray-900">Truck delivery</h3>
                  <p className="text-xs text-gray-600 mt-0.5">Select preferred delivery date</p>
                </div>
                <div className="text-base font-bold text-gray-950">$35</div>
              </div>
            </div>

            {/* Assembly Option - shown if cart has bookcase and a delivery method is chosen */}
            {hasBookcase && deliveryMethod === 'truck' && (
              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Do you need assembly?</h2>

                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50/70 cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={assemblySelected}
                      onChange={(e) => onToggleAssembly(e.target.checked)}
                      className="w-5 h-5 rounded text-[#0058a3] border-gray-300 focus:ring-[#0058a3] cursor-pointer"
                    />
                    <div className="w-10 h-10 bg-[#f4f4f4] rounded shrink-0 flex items-center justify-center p-0.5">
                      <ArloBookcaseSvg className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase">ARLO</p>
                      <p className="text-xs text-gray-600">Bookcase</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">+ $8.90</div>
                </label>
              </div>
            )}

            {/* Date and Time Slot Picker - only for Click & collect and Truck delivery (Parcel delivery has no date/time picker) */}
            {(deliveryMethod === 'collect' || deliveryMethod === 'truck') && (
              <div className="pt-6 border-t border-gray-200 space-y-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {deliveryMethod === 'collect' ? 'Pick a date for collection:' : 'Pick a date for delivery:'}
                </h2>

                {/* Month Header */}
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm">November 2026</p>
                </div>

                {/* Calendar Grid */}
                <div className="max-w-md mx-auto">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-700 mb-2">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {calendarRows.flat().map((item, idx) => {
                      const isSelected = item.isCurrentMonth && item.day === selectedDate;

                      return (
                        <div key={idx} className="h-9 flex items-center justify-center">
                          {item.disabled ? (
                            <span
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs ${
                                item.isCurrentMonth ? 'text-gray-300' : 'text-gray-200'
                              }`}
                            >
                              {item.day}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onSelectDate(item.day)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0058a3] text-white'
                                  : 'text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              {item.day}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3 pt-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className={`w-full p-4 rounded-md border text-left text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0058a3] ring-1 ring-[#0058a3] text-gray-950 bg-blue-50/10'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#0058a3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons: If an option is selected, show Continue button. Back to details is always accessible. */}
            <div className="pt-6 space-y-4">
              {deliveryMethod !== null && (
                <button
                  type="button"
                  onClick={onContinue}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#0058a3] hover:bg-[#004f93] text-white font-bold rounded-full text-base transition-colors shadow-sm cursor-pointer"
                >
                  <span>Continue to payment</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <div className={deliveryMethod !== null ? 'text-center' : ''}>
                <button
                  type="button"
                  onClick={onBackToDetails}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-black cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to details</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <RightSidebar
          view="services"
          items={items}
          deliveryMethod={deliveryMethod}
          assemblySelected={assemblySelected}
          onEditProductInCart={onEditProductInCart}
        />
      </div>
    </div>
  );
};
