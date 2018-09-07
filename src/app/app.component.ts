import {Component, OnInit} from '@angular/core';
import {NUMBER_OF_MATCHES} from './app.constants';
import {Card} from './card/card.model';
import {CardService} from './card/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  timeLimit = 60000;
  isCritical = false;
  isGuarding = true;
  inGame = false;
  rows = Array<Card[]>();
  currentSessionOpen = false;
  previousCard = null;
  numPairs = 0;
  timer = null;

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
    this.rows = [];
    this.rows = this.cardService.getRows();
  }

  start() {
    this.isGuarding = false;
    this.inGame = true;
    // create deck
    this.rows = [];
    this.rows = this.cardService.getRows();
    // start timer
  }

  check(card: Card) {
    if (!card.isFaceUp) {
      if (this.currentSessionOpen && this.previousCard !== card &&
        this.previousCard.item === card.item && !card.isFaceUp) {
        card.isFaceUp = true;
        this.previousCard = null;
        this.currentSessionOpen = false;
        this.numPairs++;
      } else if (this.currentSessionOpen && this.previousCard !== card
        && this.previousCard.item !== card.item && !card.isFaceUp) {
        this.isGuarding = true;
        card.isFaceUp = true;
        this.currentSessionOpen = false;
        setTimeout(() => {
          this.previousCard.isFaceUp = card.isFaceUp = false;
          this.previousCard = null;
          this.isGuarding = false;
          this.inGame = true;
        }, 1000);
      } else {
        card.isFaceUp = true;
        this.currentSessionOpen = true;
        this.previousCard = card;
      }
    }

    if (this.numPairs === NUMBER_OF_MATCHES) {
      console.log('end of game');
      this.inGame = false;
    }

  }
}
