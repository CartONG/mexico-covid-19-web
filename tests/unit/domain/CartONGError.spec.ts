import { CartONGError } from '@/domain/CartONGError';

describe('CartONGError', () => {
  it('Should be an instance of Error', () => {
    const cartONGError = new CartONGError();
    expect(cartONGError).toBeInstanceOf(Error);
  });

  it('Should have a message and stack catch cause', () => {
    const cartONGError = new CartONGError('Error message').cause(new Error('Another error'));
    expect(cartONGError.message).toBe('Error message');
    expect(cartONGError.stack).toContain('Error message');
    expect(cartONGError.stack).toContain('\nCaused by: Error');
    expect(cartONGError.stack).toContain('Another error');
  });

  it('Should not add message without stack from deep error', () => {
    const withoutStack = new Error('Without stack');
    withoutStack.stack = undefined;
    const cartONGError = new CartONGError('Error message').cause(withoutStack);
    expect(cartONGError.stack).not.toContain('undefined');
    expect(cartONGError.stack).not.toContain('Caused by');
  });

  it('Should not add to stack without existing stack', () => {
    const cartONGError = new CartONGError('Error message');
    cartONGError.stack = undefined;
    cartONGError.cause(new Error('Another error'));
    expect(cartONGError.stack).toBeUndefined();
  });
});
