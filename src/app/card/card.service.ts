import {Card} from './card.model';
import {BOARD_COLUMNS, BOARD_ROWS, LETTERS, NUMBER_OF_MATCHES} from '../app.constants';
import {shuffle} from '../helpers/shuffler';

export class CardService {

  cards: Card[] = [];
  rows = Array<Card[]>();
  card: Card;

  pool = [];
  items = LETTERS;

  generateLetters() {
    this.rows = [];
    this.items = shuffle(this.items);

    for (let i = 0; i < NUMBER_OF_MATCHES; i++) {
      this.pool.push(this.items[i]); // random numbers
    }
    this.pool.push(...this.pool);
    this.pool = shuffle(this.pool);
    console.log(this.pool);
  }

  createDeck() {
    this.generateLetters();
    for (let i = 0; i < BOARD_ROWS; i++) {
      this.cards = [];
      for (let j = 0; j < BOARD_COLUMNS; j++) {
        this.card = new Card(this.pool[(i * BOARD_COLUMNS) + j]);
        this.cards.push(this.card);
      }
      this.rows[i] = this.cards;
    }
    return this.rows;
  }

  getRows() {
    return this.createDeck();
  }

}
