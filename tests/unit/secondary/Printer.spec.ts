import sinon from 'sinon';

import { Printer } from '@/secondary/Printer';

const stubWindow = () => ({
  print: sinon.stub(),
  addEventListener: sinon.stub(),
  removeEventListener: sinon.stub(),
});

describe('Printer', () => {
  it('should print', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any);
    printer.print();
    expect(windowStub.print.calledOnce).toBeTruthy();
  });

  it('should register to before print event', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any);
    const callable = () => {};
    printer.onBeforePrint(callable);
    expect(windowStub.addEventListener.getCall(0).args[0]).toBe('beforeprint');
    expect(windowStub.addEventListener.getCall(0).args[1]).toBe(callable);
  });

  it('should unregister to before print event', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any);
    const callable = () => {};
    printer.offBeforePrint(callable);
    expect(windowStub.removeEventListener.getCall(0).args[0]).toBe('beforeprint');
    expect(windowStub.removeEventListener.getCall(0).args[1]).toBe(callable);
  });

  it('should register to after print event', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any);
    const callable = () => {};
    printer.onAfterPrint(callable);
    expect(windowStub.addEventListener.getCall(0).args[0]).toBe('afterprint');
    expect(windowStub.addEventListener.getCall(0).args[1]).toBe(callable);
  });

  it('should unregister to after print event', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any);
    const callable = () => {};
    printer.offAfterPrint(callable);
    expect(windowStub.removeEventListener.getCall(0).args[0]).toBe('afterprint');
    expect(windowStub.removeEventListener.getCall(0).args[1]).toBe(callable);
  });
});
