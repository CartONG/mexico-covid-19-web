import sinon from 'sinon';

import { ConsoleLogger } from '@/secondary/ConsoleLogger';

describe('ConsoleLogger', () => {
  it('Should log an error', () => {
    const logger = {
      error: sinon.stub(),
    };
    const consoleLogger = new ConsoleLogger(logger as any);
    const error = new Error('Error message');

    consoleLogger.error('An error occurs', error);

    const [message, errorPassed] = logger.error.getCall(0).args;
    expect(message).toBe('An error occurs');
    expect(errorPassed).toBeInstanceOf(Error);
    expect(errorPassed.message).toBe('Error message');
  });
});
