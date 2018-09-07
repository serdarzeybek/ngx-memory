export class Card {
  public item: string;
  public isFaceUp: boolean;

  constructor(item: string) {
    this.item = item;
    this.isFaceUp = false;
  }
}
