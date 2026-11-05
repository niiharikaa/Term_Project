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

test('checkout services and payment: truck delivery + assembly adds $35 + $8.90 ($132.90 total)', () => {
  const items = [{ product: PRODUCTS.bookcase, quantity: 1 }];
  const totals = calculateCheckoutTotals(items, 'payment', 'truck', true);

  assert.equal(totals.productsTotal, 89);
  assert.equal(totals.deliveryFee, 35);
  assert.equal(totals.assemblyFee, 8.9);
  assert.equal(Math.round(totals.total * 100) / 100, 132.9);
});
