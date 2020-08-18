import { CartONGError } from '@/domain/CartONGError';

const isBadFormat = (pattern: string): boolean => !pattern.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);

export class InvalidDate extends CartONGError {
  constructor() {
    super('The date is invalid');
  }
  static assertValidity(pattern: string): void {
    if (isBadFormat(pattern) || isNaN(Date.parse(pattern))) {
      throw new InvalidDate();
    }
  }
}
