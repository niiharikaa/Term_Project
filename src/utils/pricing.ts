export interface CartProduct {
  id: string;
  name: string;
  subtitle: string;
  itemNo: string;
  price: number;
  isBulky: boolean;
  canAssemble: boolean;
  assemblyPrice?: number;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export const PRODUCTS: Record<string, CartProduct> = {
  lamp: {
    id: 'luma-lamp',
    name: 'LUMA',
    subtitle: 'Table lamp, nickel-plated/grey glass',
    itemNo: '302.118.47',
    price: 49.90,
    isBulky: false,
    canAssemble: false,
  },
  bookcase: {
    id: 'arlo-bookcase',
    name: 'ARLO',
    subtitle: 'Bookcase, white, 80x28x202 cm',
    itemNo: '105.274.63',
    price: 89.00,
    isBulky: true,
    canAssemble: true,
    assemblyPrice: 8.90,
  },
};

export type DeliveryMethod = 'truck' | 'collect';

export function formatPriceNumber(num: number): string {
  if (num % 1 === 0) {
    return `${num}`;
  }
  return num.toFixed(2);
}

export function formatPrice(num: number): string {
  return `$${formatPriceNumber(num)}`;
}

export function calculateCartTotals(items: CartItem[]) {
  const productCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productsTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const hasBulky = items.some((item) => item.product.isBulky && item.quantity > 0);
  const deliveryEstimate = items.length === 0 ? 0 : hasBulky ? 35 : 10;
  const deliveryText = items.length === 0 ? '$0' : `From $${deliveryEstimate}`;
  const subtotal = productsTotal + deliveryEstimate;

  return {
    productCount,
    productsTotal,
    hasBulky,
    deliveryEstimate,
    deliveryText,
    subtotal,
  };
}

export function calculateCheckoutTotals(
  items: CartItem[],
  step: 'details' | 'services' | 'payment',
  deliveryMethod: DeliveryMethod | null,
  assemblySelected: boolean
) {
  const productsTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // In details: delivery drops out!
  if (step === 'details') {
    return {
      productsTotal,
      deliveryFee: 0,
      assemblyFee: 0,
      total: productsTotal,
    };
  }

  // In services & payment:
  let deliveryFee = 0;
  if (deliveryMethod === 'truck') {
    deliveryFee = 35;
  } else if (deliveryMethod === 'collect') {
    deliveryFee = 10;
  }

  const hasBookcase = items.some((item) => item.product.canAssemble && item.quantity > 0);
  const assemblyFee = assemblySelected && hasBookcase ? 8.90 : 0;

  const total = productsTotal + deliveryFee + assemblyFee;

  return {
    productsTotal,
    deliveryFee,
    assemblyFee,
    total,
  };
}
