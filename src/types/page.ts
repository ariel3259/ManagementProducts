export abstract class Page<T> {
  private elements: T[];
  private totalItems: number;

  constructor(elements: T[], totalItems: number) {
    this.elements = elements;
    this.totalItems = totalItems;
  }

  getElements(): T[] {
    return this.elements;
  }

  getTotalNumbers(): number {
    return this.totalItems;
  }
}
