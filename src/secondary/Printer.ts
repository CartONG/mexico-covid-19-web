const BEFORE_PRINT_EVENT = 'beforeprint';
const AFTER_PRINT_EVENT = 'afterprint';

export class Printer {
  constructor(private window: Window) {}

  public print() {
    this.window.print();
  }

  public onBeforePrint(callable: () => void) {
    this.window.addEventListener(BEFORE_PRINT_EVENT, callable);
  }

  public onAfterPrint(callable: () => void) {
    this.window.addEventListener(AFTER_PRINT_EVENT, callable);
  }

  public offBeforePrint(callable: () => void) {
    this.window.removeEventListener(BEFORE_PRINT_EVENT, callable);
  }

  public offAfterPrint(callable: () => void) {
    this.window.removeEventListener(AFTER_PRINT_EVENT, callable);
  }
}
