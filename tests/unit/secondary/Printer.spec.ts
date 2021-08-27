import sinon from 'sinon';

import mitt from 'mitt';

import { Printer } from '@/secondary/Printer';

const stubMediaQueryList = () => ({
  addEventListener: sinon.stub(),
});

const stubWindow = () => ({
  navigator: { userAgent: '' },
  print: sinon.stub(),
  addEventListener: sinon.stub(),
  removeEventListener: sinon.stub(),
  matchMedia: sinon.stub(),
});

describe('Printer', () => {
  it('should print', () => {
    const windowStub = stubWindow();
    const printer = new Printer(windowStub as any, mitt<any>());
    printer.print();
    expect(windowStub.print.calledOnce).toBeTruthy();
  });

  it('should register to before print event', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const printer = new Printer(windowStub as any, emitter);
    const onSpy = sinon.spy(emitter, 'on');
    const callable = () => {};
    printer.onBeforePrint(callable);
    expect(onSpy.firstCall.args[0]).toBe('print:before');
    expect(onSpy.firstCall.args[1]).toBe(callable);
  });

  it('should unregister to before print event', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const printer = new Printer(windowStub as any, emitter);
    const offSpy = sinon.spy(emitter, 'off');
    const callable = () => {};
    printer.offBeforePrint(callable);
    expect(offSpy.firstCall.args[0]).toBe('print:before');
    expect(offSpy.firstCall.args[1]).toBe(callable);
  });

  it('should register to after print event', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const printer = new Printer(windowStub as any, emitter);
    const onSpy = sinon.spy(emitter, 'on');
    const callable = () => {};
    printer.onAfterPrint(callable);
    expect(onSpy.firstCall.args[0]).toBe('print:after');
    expect(onSpy.firstCall.args[1]).toBe(callable);
  });

  it('should unregister to after print event', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const printer = new Printer(windowStub as any, emitter);
    const offSpy = sinon.spy(emitter, 'off');
    const callable = () => {};
    printer.offAfterPrint(callable);
    expect(offSpy.firstCall.args[0]).toBe('print:after');
    expect(offSpy.firstCall.args[1]).toBe(callable);
  });

  it('should listen to print beforeprint and afterprint events for non Chrome browsers', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    new Printer(windowStub as any, emitter);
    expect(windowStub.addEventListener.calledTwice).toBe(true);
    expect(windowStub.addEventListener.firstCall.args[0]).toBe('beforeprint');
    expect(windowStub.addEventListener.secondCall.args[0]).toBe('afterprint');
  });

  it('should react to print beforeprint and afterprint events for non Chrome browsers', () => {
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const emitSpy = sinon.spy(emitter, 'emit');
    windowStub.addEventListener.onCall(0).callsArg(1);
    windowStub.addEventListener.onCall(1).callsArg(1);
    new Printer(windowStub as any, emitter);
    expect(emitSpy.firstCall.args[0]).toBe('print:before');
    expect(emitSpy.secondCall.args[0]).toBe('print:after');
  });

  it('should listen to print media events for Chrome browsers', () => {
    const mediaQueryList = stubMediaQueryList();
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    windowStub.navigator.userAgent = 'Chrome';
    windowStub.matchMedia.returns(mediaQueryList);
    new Printer(windowStub as any, emitter);
    expect(mediaQueryList.addEventListener.calledOnce).toBe(true);
  });

  it('should react to print media events for non Chrome browsers', () => {
    const mediaQueryList = stubMediaQueryList();
    const windowStub = stubWindow();
    const emitter = mitt<any>();
    const emitSpy = sinon.spy(emitter, 'emit');
    windowStub.navigator.userAgent = 'Chrome';
    windowStub.matchMedia.returns(mediaQueryList);
    new Printer(windowStub as any, emitter);
    mediaQueryList.addEventListener.callArgWith(1, { matches: true });
    mediaQueryList.addEventListener.callArgWith(1, { matches: false });
    expect(emitSpy.firstCall.args[0]).toBe('print:before');
    expect(emitSpy.secondCall.args[0]).toBe('print:after');
  });
});
