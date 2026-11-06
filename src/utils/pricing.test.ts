import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  calculateCartTotals,
  calculateCheckoutTotals,
  formatPriceNumber,
  formatPrice,
} from './pricing.ts';

test('formatPrice formats whole numbers without decimals and cents with decimals', () => {
  assert.equal(formatPriceNumber(89), '89');
  assert.equal(formatPriceNumber(124), '124');
  assert.equal(formatPriceNumber(49.9), '49.90');
  assert.equal(formatPriceNumber(8.9), '8.90');
  assert.equal(formatPrice(89), '$89');
  assert.equal(formatPrice(49.9), '$49.90');
});

test('cart starts with lamp only: delivery is From $10 and subtotal includes $10', () => {
  const lampItem = { product: PRODUCTS.lamp, quantity: 1 };
  const totals = calculateCartTotals([lampItem]);

  assert.equal(totals.productCount, 1);
  assert.equal(totals.productsTotal, 49.9);
  assert.equal(totals.deliveryEstimate, 10);
  assert.equal(totals.deliveryText, 'From $10');
  assert.equal(totals.subtotal, 59.9);
});

test('cart with bookcase only: delivery is From $35 and subtotal is $124', () => {
  const bookcaseItem = { product: PRODUCTS.bookcase, quantity: 1 };
  const totals = calculateCartTotals([bookcaseItem]);

  assert.equal(totals.productCount, 1);
  assert.equal(totals.productsTotal, 89);
  assert.equal(totals.deliveryEstimate, 35);
  assert.equal(totals.deliveryText, 'From $35');
  assert.equal(totals.subtotal, 124);
});

test('cart with both lamp and bookcase: delivery is From $35', () => {
  const totals = calculateCartTotals([
    { product: PRODUCTS.lamp, quantity: 1 },
    { product: PRODUCTS.bookcase, quantity: 1 },
  ]);

  assert.equal(totals.productCount, 2);
  assert.equal(totals.productsTotal, 138.9);
  assert.equal(totals.deliveryEstimate, 35);
  assert.equal(totals.subtotal, 173.9);
});

test('checkout details: total price drops delivery and shows products only ($89 for bookcase)', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const detailsTotals = calculateCheckoutTotals(items, 'details', null, false);

  assert.equal(detailsTotals.productsTotal, 89);
  assert.equal(detailsTotals.deliveryFee, 0);
  assert.equal(detailsTotals.total, 89);
});

test('checkout services: without selected delivery method total is products only', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const totals = calculateCheckoutTotals(items, 'services', null, false);

  assert.equal(totals.total, 89);
});

test('checkout services: truck delivery adds $35 ($124 total)', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const totals = calculateCheckoutTotals(items, 'services', 'truck', false);

  assert.equal(totals.deliveryFee, 35);
  assert.equal(totals.total, 124);
});

test('checkout services: parcel delivery adds $10', () => {
  const items = [{ product: PRODUCTS.lamp, quantity: 1 }];
  const totals = calculateCheckoutTotals(items, 'services', 'parcel', false);

  assert.equal(totals.deliveryFee, 10);
  assert.equal(totals.total, 59.9);
});

test('checkout services: assembly fee only applies with truck delivery', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const unselectedTotals = calculateCheckoutTotals(items, 'services', null, true);
  assert.equal(unselectedTotals.assemblyFee, 0);
  assert.equal(unselectedTotals.total, 89);

  const collectTotals = calculateCheckoutTotals(items, 'services', 'collect', true);
  assert.equal(collectTotals.assemblyFee, 0);
  assert.equal(collectTotals.total, 99);

  const truckTotals = calculateCheckoutTotals(items, 'services', 'truck', true);
  assert.equal(truckTotals.assemblyFee, 8.9);
  assert.equal(truckTotals.total, 132.9);
});
test('Variant B - lamp only: delivery is Parcel delivery: $10 and estimated total is $59.90', () => {
  const items = [{ product: PRODUCTS.lamp, quantity: 1 }];
  const cartTotals = calculateCartTotals(items, 'B');

  assert.equal(cartTotals.deliveryText, 'Parcel delivery: $10');
  assert.equal(cartTotals.total, 59.9);

  const detailsTotals = calculateCheckoutTotals(items, 'details', null, false, 'B');
  assert.equal(detailsTotals.total, 59.9);
});

test('Variant B - bookcase with 3rd-floor no-lift and assembly: total is $152.90 across all steps', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  // In cart: chose no-lift floor 3-5 and assembly incl. anchoring
  const cartTotals = calculateCartTotals(items, 'B', 'no-lift-3-5', 'assembly');

  assert.equal(cartTotals.deliveryText, 'Truck delivery (items over 15 kg): $35');
  assert.equal(cartTotals.noLiftFee, 20);
  assert.equal(cartTotals.assemblyFee, 8.9);
  assert.equal(cartTotals.total, 152.9);

  // Consistent total on details
  const detailsTotals = calculateCheckoutTotals(items, 'details', null, false, 'B', 'no-lift-3-5', 'assembly');
  assert.equal(detailsTotals.total, 152.9);

  // Consistent total on services
  const servicesTotals = calculateCheckoutTotals(items, 'services', 'truck', true, 'B', 'no-lift-3-5', 'assembly');
  assert.equal(servicesTotals.total, 152.9);

  // Consistent total on payment
  const paymentTotals = calculateCheckoutTotals(items, 'payment', 'truck', true, 'B', 'no-lift-3-5', 'assembly');
  assert.equal(paymentTotals.total, 152.9);

  // If customer switches to Click & collect on services, delivery drops to $10, no-lift and assembly drop out
  const collectTotals = calculateCheckoutTotals(items, 'services', 'collect', false, 'B', 'no-lift-3-5', 'assembly');
  assert.equal(collectTotals.deliveryFee, 10);
  assert.equal(collectTotals.noLiftFee, 0);
  assert.equal(collectTotals.assemblyFee, 0);
  assert.equal(collectTotals.total, 99);
});

test('Variant B - bookcase with no-lift floor 3-5 and self-anchoring: total is $144', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const cartTotals = calculateCartTotals(items, 'B', 'no-lift-3-5', 'self');

  assert.equal(cartTotals.noLiftFee, 20);
  assert.equal(cartTotals.assemblyFee, 0);
  assert.equal(cartTotals.total, 144);
});
