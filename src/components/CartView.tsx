import React from 'react';
import { Trash2, Plus, Minus, PlusCircle } from 'lucide-react';
import { CartItem, PRODUCTS, formatPrice } from '../utils/pricing.ts';
import { LumaLampSvg, ArloBookcaseSvg } from './ProductThumbnails.tsx';
import { RightSidebar } from './RightSidebar.tsx';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddBookcase: () => void;
  onCheckOut: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddBookcase,
  onCheckOut,
}) => {
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasBookcaseInCart = items.some((item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Left main cart column */}
        <div className="flex-1 w-full max-w-3xl">
          <h1 className="text-3xl font-extrabold text-gray-950 mb-2">Your cart</h1>
          <p className="text-sm text-gray-500 mb-8">
            {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in total
          </p>

          {items.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center space-y-4">
              <p className="text-gray-600 font-medium">Your cart is currently empty.</p>
              <button
                type="button"
                onClick={onAddBookcase}
                className="px-6 py-2.5 bg-[#0058a3] text-white font-bold rounded-full text-sm hover:bg-[#004f93] cursor-pointer"
              >
                Add ARLO Bookcase ($89)
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {items.map((item) => {
                const isLamp = item.product.id === 'luma-lamp';

                return (
                  <div key={item.product.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start">
                    {/* Thumbnail */}
                    <div className="w-28 h-28 bg-[#f4f4f4] rounded-md shrink-0 flex items-center justify-center p-1">
                      {isLamp ? (
                        <LumaLampSvg className="w-24 h-24" />
                      ) : (
                        <ArloBookcaseSvg className="w-24 h-24" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h2 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                            {item.product.name}
                          </h2>
                          <p className="text-sm text-gray-700">{item.product.subtitle}</p>
                          <div className="mt-2 inline-block bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded font-mono font-medium">
                            {item.product.itemNo}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-base font-bold text-gray-950">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Quantity pill */}
                          <div className="inline-flex items-center border border-gray-300 rounded-full bg-white px-2 py-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-900 select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                              className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Trash button */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            className="p-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Move to favourites */}
                        <button
                          type="button"
                          className="text-xs text-gray-700 underline font-medium hover:text-gray-950 cursor-pointer"
                        >
                          Move to favourites
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* "You may also like" Recommendation Row */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">You may also like</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#f4f4f4] rounded shrink-0 flex items-center justify-center p-1">
                  <ArloBookcaseSvg className="w-16 h-16" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0058a3] uppercase tracking-wider">Top Recommendation</span>
                  <h3 className="text-base font-bold text-gray-900 uppercase">ARLO</h3>
                  <p className="text-sm text-gray-600">Bookcase, white, 80x28x202 cm</p>
                  <p className="text-sm font-extrabold text-gray-950 mt-1">$89</p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onAddBookcase}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0058a3] hover:bg-[#004f93] text-white text-sm font-bold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{hasBookcaseInCart ? 'Add another' : 'Add to cart'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <RightSidebar
          view="cart"
          items={items}
          onCheckOut={onCheckOut}
        />
      </div>
    </div>
  );
};
