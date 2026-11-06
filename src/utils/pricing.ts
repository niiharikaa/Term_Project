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

export type DeliveryMethod = 'parcel' | 'collect' | 'truck';
export type LiftAccessOption = 'lift' | 'no-lift-1-2' | 'no-lift-3-5';
export type AnchoringOption = 'assembly' | 'self';

export function formatPriceNumber(num: number): string {
  if (num % 1 === 0) {
    return `${num}`;
  }
  return num.toFixed(2);
}

export function formatPrice(num: number): string {
  return `$${formatPriceNumber(num)}`;
}

export function calculateCartTotals(
  items: CartItem[],
  variant: 'A' | 'B' = 'A',
  liftAccess: LiftAccessOption | null = null,
  anchoringChoice: AnchoringOption | null = null
) {
  const productCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const productsTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const hasBulky = items.some((item) => item.product.isBulky && item.quantity > 0);
  const hasBookcase = items.some((item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0);

  if (variant === 'B') {
    // F1: In the cart, replace "Delivery price From $10/From $35" with the delivery for this cart, without "From":
    // "Parcel delivery: $10" (lamp only) or "Truck delivery (items over 15 kg): $35" (bookcase in cart).
    const deliveryFee = items.length === 0 ? 0 : hasBulky ? 35 : 10;
    const deliveryLabel = hasBulky ? 'Truck delivery (items over 15 kg)' : 'Parcel delivery';
    const deliveryText = items.length === 0 ? '$0' : hasBulky ? 'Truck delivery (items over 15 kg): $35' : 'Parcel delivery: $10';

    // F4: assembly incl. anchoring
    const assemblyFee = hasBookcase && anchoringChoice === 'assembly' ? 8.90 : 0;

    // F3: no-lift charge
    const noLiftFee = hasBookcase && liftAccess === 'no-lift-3-5' ? 20.00 : 0;

    // F2: Estimated total: products + delivery + assembly (if chosen) + no-lift charge (if chosen)
    const estimatedTotal = productsTotal + deliveryFee + assemblyFee + noLiftFee;

    return {
      productCount,
      productsTotal,
      hasBulky,
      deliveryEstimate: deliveryFee,
      deliveryLabel,
      deliveryText,
      assemblyFee,
      noLiftFee,
      subtotal: estimatedTotal,
      total: estimatedTotal,
    };
  }

  // Variant A behavior unchanged
  const deliveryEstimate = items.length === 0 ? 0 : hasBulky ? 35 : 10;
  const deliveryText = items.length === 0 ? '$0' : `From $${deliveryEstimate}`;
  const subtotal = productsTotal + deliveryEstimate;

  return {
    productCount,
    productsTotal,
    hasBulky,
    deliveryEstimate,
    deliveryLabel: 'Delivery price',
    deliveryText,
    assemblyFee: 0,
    noLiftFee: 0,
    subtotal,
    total: subtotal,
  };
}

export function calculateCheckoutTotals(
  items: CartItem[],
  step: 'details' | 'services' | 'payment',
  deliveryMethod: DeliveryMethod | null,
  assemblySelected: boolean,
  variant: 'A' | 'B' = 'A',
  liftAccess: LiftAccessOption | null = null,
  anchoringChoice: AnchoringOption | null = null
) {
  const productsTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const hasBulky = items.some((item) => item.product.isBulky && item.quantity > 0);
  const hasBookcase = items.some((item) => item.product.id === PRODUCTS.bookcase.id && item.quantity > 0);

  if (variant === 'B') {
    // F2: Show this same Estimated total on Details, Services and Payment instead of the changing totals.
    // It only changes if the shopper changes a choice (e.g. Click & collect removes the delivery and no-lift lines).
    const isClickAndCollect = deliveryMethod === 'collect';

    let deliveryFee = 0;
    let assemblyFee = 0;
    let noLiftFee = 0;

    if (isClickAndCollect) {
      // Click & collect removes the delivery and no-lift lines
      deliveryFee = 10;
      assemblyFee = 0;
      noLiftFee = 0;
    } else {
      // Standard / Truck delivery
      deliveryFee = hasBulky ? 35 : 10;
      assemblyFee = hasBookcase && (assemblySelected || anchoringChoice === 'assembly') ? 8.90 : 0;
      noLiftFee = hasBookcase && liftAccess === 'no-lift-3-5' ? 20.00 : 0;
    }

    const total = productsTotal + deliveryFee + assemblyFee + noLiftFee;

    return {
      productsTotal,
      deliveryFee,
      assemblyFee,
      noLiftFee,
      total,
    };
  }

  // In details: delivery drops out!
  if (step === 'details') {
    return {
      productsTotal,
      deliveryFee: 0,
      assemblyFee: 0,
      noLiftFee: 0,
      total: productsTotal,
    };
  }

  // In services & payment:
  let deliveryFee = 0;
  if (deliveryMethod === 'truck') {
    deliveryFee = 35;
  } else if (deliveryMethod === 'collect' || deliveryMethod === 'parcel') {
    deliveryFee = 10;
  }

  const assemblyFee = assemblySelected && hasBookcase && deliveryMethod === 'truck' ? 8.90 : 0;
  const total = productsTotal + deliveryFee + assemblyFee;

  return {
    productsTotal,
    deliveryFee,
    assemblyFee,
    noLiftFee: 0,
    total,
  };
}
