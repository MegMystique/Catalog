import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
@Injectable()
export class DataStreamService {
  cards = [];
  baseCard = [];
  workCards = [];
  cardsChanges = new Subject<Object[]>();
  treeCardsChanges = new Subject<Object[]>();
  pagesChanges = new Subject<number>();
  firstIndex = 0;
  lastIndex = 10;
  cardsByPage = 12;
  currentPage = 1;

  constructor() {
  }

  setCards(cards) {
    let id = 0;
    cards.map(card => {
      card.timestamp = (moment.unix(card.timestamp).format('YYYY-MM-DD HH:mm'));
      card.id = id;
      id += 1
    });
    this.cards = cards; //карточки на странице
    this.baseCard = cards; //карточки с "сервера"
    this.workCards = cards; //список с текущим состоянием карточек (без удаленных)
    this.treeCardsChanges.next(this.baseCard.slice());
    this.getPages();
    this.updatePage(this.currentPage)
  }

  deleteCard(cardDelete) {
    this.workCards = this.workCards.filter(card => card !== cardDelete);
    this.updatePage(this.currentPage);
    this.getPages()
  }

  getBaseCard() {
    this.workCards = this.baseCard.slice();
    this.updatePage(this.currentPage);
    this.getPages()
  }

  sortCards(type) {
    if (type === 'date') {
      this.cards = this.workCards.sort((a, b) => {
        if (a.timestamp > b.timestamp)return 1;
        if (a.timestamp < b.timestamp)return -1;
      });

    } else if (type === 'size') {
      this.cards = this.workCards.sort((a, b) => {
        if (a.filesize > b.filesize)return 1;
        if (a.filesize < b.filesize)return -1;
      });
    }
    this.updatePage(this.currentPage)
  }

  updatePage(page, arr = this.workCards) {
    this.lastIndex = page * this.cardsByPage;
    this.firstIndex = this.lastIndex - this.cardsByPage;
    this.cards = arr.slice(this.firstIndex, this.lastIndex);
    this.currentPage = page;
    this.cardsChanges.next(this.cards.slice());
  }

  getPages() {
    let pages = this.workCards.length % this.cardsByPage > 0 ? Math.floor(this.workCards.length / this.cardsByPage) + 1 : Math.floor(this.workCards.length / this.cardsByPage);
    this.pagesChanges.next(pages);
  }

}
