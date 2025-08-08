export class GlobalCounter {
  private static instance: GlobalCounter;
  private value: number;

  private constructor() {
    this.value = 0
  }

  public static getInstance(): GlobalCounter {
    if (!GlobalCounter.instance) {
      GlobalCounter.instance = new GlobalCounter();
    }
    return GlobalCounter.instance;
  }

  public increment(): void {
    this.value++;
  }

  public decrement(): void {
    this.value--;
  }

  public reset(): void {
    this.value = 0
  }

  public getValue(): number {
    return this.value
  }
}
