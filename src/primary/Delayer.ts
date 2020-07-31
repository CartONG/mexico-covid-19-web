export class Delayer {
  constructor(private nativeWindow: Window, private delay: number) {}

  afterDelay(callable: () => any) {
    this.nativeWindow.setTimeout(() => callable(), this.delay);
  }
}
