import Decimal from 'decimal.js';
import { ValidationError } from './errors';
import { getSettings } from '../modules/settings/settings.service';

export interface PriceBreakdown {
  subtotal: Decimal;
  discount: Decimal;
  tax: Decimal;
  deliveryFee: Decimal;
  serviceFee: Decimal;
  total: Decimal;
}

const money = (v: Decimal) => v.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

export const calcFinalTotal = async (subtotal: Decimal, discountPercent = 0): Promise<PriceBreakdown> => {
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new ValidationError('Discount must be between 0 and 100');
  }
  if (subtotal.isNegative()) {
    throw new ValidationError('Subtotal cannot be negative');
  }

  const settings = await getSettings();

  const TAX_RATE = new Decimal(settings.taxRate.toString());
  const DELIVERY_FEE = new Decimal(settings.deliveryFee.toString());
  const SERVICE_FEE = new Decimal(settings.serviceFee.toString());
  const FREE_DELIVERY_THRESHOLD = new Decimal(settings.freeDeliveryThreshold.toString());

  const discount = subtotal.times(discountPercent).div(100);
  const afterPromo = subtotal.minus(discount);
  const tax = afterPromo.times(TAX_RATE);
  const deliveryFee = subtotal.gte(FREE_DELIVERY_THRESHOLD) ? new Decimal(0) : DELIVERY_FEE;
  const serviceFee = SERVICE_FEE;
  const total = afterPromo.plus(tax).plus(deliveryFee).plus(serviceFee);

  return {
    subtotal: money(subtotal),
    discount: money(discount),
    tax: money(tax),
    deliveryFee: money(deliveryFee),
    serviceFee: money(serviceFee),
    total: money(total),
  };
};
