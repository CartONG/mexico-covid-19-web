import sinon from 'sinon';

import { Delayer } from '@/primary/Delayer';

describe('Delayer', () => {
  it('should delay', next => {
    const delayer = new Delayer(window, 0);
    const callbackStub = sinon.stub();
    delayer.afterDelay(callbackStub);
    setTimeout(() => {
      expect(callbackStub.calledOnce).toBeTruthy();
      next();
    }, 1);
  });
});
