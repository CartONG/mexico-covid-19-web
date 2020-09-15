import { CartONGError } from '@/domain/CartONGError';
import { InvalidDate } from '@/domain/date/InvalidDate';

describe('InvalidDate', () => {
  it('Should assert an error from invalid date', next => {
    try {
      InvalidDate.assertValidity('2019-13-01');
    } catch (error) {
      expect(error).toBeInstanceOf(CartONGError);
      expect(error.name).toBe('InvalidDate');
      expect(error.message).toBe('The date is invalid');
      next();
    }
  });
  it('Should assert an error from ISO datetime', next => {
    try {
      InvalidDate.assertValidity('2020-01-21T14:08:59Z');
    } catch (error) {
      expect(error).toBeInstanceOf(CartONGError);
      expect(error.name).toBe('InvalidDate');
      expect(error.message).toBe('The date is invalid');
      next();
    }
  });
  it('Should not assert an error from valid date', () => {
    expect(() => InvalidDate.assertValidity('2019-12-01')).not.toThrow();
  });
});
