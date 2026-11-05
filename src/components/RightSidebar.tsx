import React from 'react';
import { Pencil, Heart } from 'lucide-react';
import { CartItem, DeliveryMethod, calculateCartTotals, calculateCheckoutTotals, formatPrice } from '../utils/pricing.ts';
import { LumaLampSvg, ArloBookcaseSvg, PaymentMethodLogos } from './ProductThumbnails.tsx';

interface RightSidebarProps {
  view: 'cart' | 'details' | 'services' | 'payment';
  items: CartItem[];
  deliveryMethod?: DeliveryMethod | null;
  assemblySelected?: boolean;
  onCheckOut?: () => void;
  onEditProductInCart?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  view,
  items,
  deliveryMethod = null,
  assemblySelected = false,
  onCheckOut,
  onEditProductInCart,
}) => {
  if (view === 'cart') {
    const { productCount, productsTotal, deliveryText, subtotal } = calculateCartTotals(items);
    const subtotalFormatted = formatPrice(subtotal);
    // Split for superscript cents display if needed
    const parts = subtotalFormatted.split('.');
    const dollarPart = parts[0];
    const centPart = parts[1];

    return (
      <aside className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:w-96 shrink-0 h-fit">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order summary</h2>

        <div className="space-y-3 text-sm text-gray-800">
          <div className="flex justify-between items-center">
            <span>Products ({productCount})</span>
            <span className="font-semibold">{formatPrice(productsTotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Delivery price</span>
            <span className="font-semibold">{deliveryText}</span>
          </div>
        </div>

        <div className="border-t border-gray-300 my-5" />

        <div className="flex justify-between items-baseline mb-4">
          <span className="text-base font-bold text-gray-900">
            Subtotal <span className="text-xs font-normal text-gray-600 block sm:inline">(excl. assembly fees)</span>
          </span>
          <span className="text-2xl font-black text-gray-950 flex items-baseline tracking-tight">
            <span>{dollarPart}</span>
            {centPart && <span className="text-base font-bold -top-1 relative">.{centPart}</span>}
          </span>
        </div>

        <p className="text-[11px] text-gray-500 leading-tight mb-4">
          By clicking &quot;check out&quot;, you&apos;re agreeing to our{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="underline hover:text-gray-800">
            Privacy Policy
          </a>
        </p>

        <button
          type="button"
          onClick={onCheckOut}
          disabled={items.length === 0}
          className="w-full bg-[#0058a3] hover:bg-[#004f93] text-white font-bold py-3.5 px-6 rounded-full text-base transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check out
        </button>

        <div className="mt-5 border-t border-gray-200 pt-4">
          <PaymentMethodLogos />
        </div>

        <div className="mt-5 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-700">
          <Heart className="w-4 h-4 text-gray-600 shrink-0" />
          <a href="#guarantee" onClick={(e) => e.preventDefault()} className="font-bold underline hover:text-gray-950">
            365 days to change your mind
          </a>
        </div>
      </aside>
    );
  }

  // Checkout views (Details, Services, Payment)
  const checkoutTotals = calculateCheckoutTotals(
    items,
    view,
    deliveryMethod,
    assemblySelected
  );

  return (
    <aside className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:w-96 shrink-0 h-fit space-y-6">
      {/* Total price header */}
      <div className="flex justify-between items-baseline pb-2 border-b border-gray-200">
        <span className="text-base font-bold text-gray-900">Total price</span>
        <span className="text-3xl font-black text-gray-950 tracking-tight">
          {formatPrice(checkoutTotals.total)}
        </span>
      </div>

      {/* Delivery details section (shown in Services and Payment) */}
      {(view === 'services' || view === 'payment') && (
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Delivery details</h3>
          {/* Fictional blurred address block exactly mimicking the screenshot */}
          <div className="p-2.5 bg-gray-50 rounded border border-gray-100 text-xs text-gray-600 space-y-1 select-none">
            <div className="filter blur-[3px]">Alex Tan</div>
            <div className="filter blur-[3px]">12 Orchard Boulevard, #08-01</div>
            <div className="filter blur-[3px]">Singapore 248641</div>
            <div className="filter blur-[3px]">+65 9123 4567</div>
          </div>
        </div>
      )}

      {/* Delivery method breakdown (shown in Payment view as in screenshot 07) */}
      {view === 'payment' && (
        <div className="space-y-2 border-t border-gray-200 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Delivery method</h3>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-900">
              {deliveryMethod === 'truck' ? 'Truck delivery' : 'Click & collect'}
            </span>
            <span className="font-semibold text-gray-900">
              {deliveryMethod === 'truck' ? '$35' : '$10'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            <p>Delivery and assembly slot</p>
            <p className="font-medium text-gray-800">10 November 9:00 AM - 12:00 PM</p>
          </div>
        </div>
      )}

      {/* Edit product in cart button */}
      <button
        type="button"
        onClick={onEditProductInCart}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-gray-900 text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Pencil className="w-4 h-4" />
        <span>Edit product in cart</span>
      </button>

      {/* Products list */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-bold text-gray-900">Products</h3>

        {items.map((item) => (
          <div key={item.product.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {item.product.id === 'luma-lamp' ? (
                  <LumaLampSvg className="w-14 h-14" />
                ) : (
                  <ArloBookcaseSvg className="w-14 h-14" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-sm text-gray-900">{item.product.name}</h4>
                  <span className="font-bold text-sm text-gray-900">{formatPrice(item.product.price)}</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{item.product.subtitle}</p>
                <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
              </div>
            </div>

            {/* If bookcase has assembly and assembly was checked */}
            {item.product.canAssemble && assemblySelected && (view === 'services' || view === 'payment') && (
              <div className="flex justify-between items-center text-xs text-gray-700 pl-4 py-1 border-l-2 border-gray-300">
                <span>+ Assembly</span>
                <span className="font-semibold">$8.90</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
