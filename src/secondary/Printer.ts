import { Emitter } from 'mitt';

const BEFORE_PRINT_NATIVE_EVENT = 'beforeprint';
const AFTER_PRINT_NATIVE_EVENT = 'afterprint';

const BEFORE_PRINT_EVENT = 'print:before';
const AFTER_PRINT_EVENT = 'print:after';

export class Printer {
  constructor(private window: Window, private bus: Emitter<any>) {
    if (this.window.navigator.userAgent.match(/Chrome/)) {
      this.window.matchMedia('print').addEventListener('change', event => {
        const internalEvent = event.matches ? BEFORE_PRINT_EVENT : AFTER_PRINT_EVENT;
        this.bus.emit(internalEvent);
      });
    } else {
      this.window.addEventListener(BEFORE_PRINT_NATIVE_EVENT, () => this.bus.emit(BEFORE_PRINT_EVENT));
      this.window.addEventListener(AFTER_PRINT_NATIVE_EVENT, () => this.bus.emit(AFTER_PRINT_EVENT));
    }
  }

  public print() {
    this.window.print();
  }

  public onBeforePrint(callable: () => void) {
    this.bus.on(BEFORE_PRINT_EVENT, callable);
  }

  public onAfterPrint(callable: () => void) {
    this.bus.on(AFTER_PRINT_EVENT, callable);
  }

  public offBeforePrint(callable: () => void) {
    this.bus.off(BEFORE_PRINT_EVENT, callable);
  }

  public offAfterPrint(callable: () => void) {
    this.bus.off(AFTER_PRINT_EVENT, callable);
  }
}
