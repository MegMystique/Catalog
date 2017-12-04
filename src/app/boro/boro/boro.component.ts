import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../data.service';
import {Subject} from 'rxjs/Subject';
import {DataStreamService} from '../data-stream.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-boro',
  templateUrl: './boro.component.html',
  styleUrls: ['./boro.component.css']
})
export class BoroComponent implements OnInit, OnDestroy {
  view: string = 'card';
  sortType: string;
  cards = [];
  pages = 1;
  treeCards = [];
  tree = [];
  pageArray=[];
  loading:boolean=false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dateService: DataService, private streamService: DataStreamService) {
  }

  ngOnInit() {
    this.loading=true;
    this.streamService.treeCardsChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(cards => {
        this.treeCards = cards;
        this.createTree()
      });
    this.streamService.cardsChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(cards => {this.cards = cards;this.loading=false});

    this.streamService.pagesChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(pages => {
        this.pages = pages;
        this.pageArray = Array.apply(null, {length: this.pages}).map((value, index) => index + 1);

      });
    this.dateService.getDataFromServer();

  }

  resetCards() {
    this.streamService.getBaseCard()
  }

  sortCards(type) {
    this.streamService.sortCards(type || '')
  }

  createTree() {
    for (let card of this.treeCards) {
      let unique = true;
      for (let category of this.tree) {
        if (card.category == category.name) {
          unique = false;
        }
      }
      if (unique) {
        this.tree.push({name: card.category});
      }
    }
    for (let category of this.tree) {
      category.children = this.treeCards.filter(card => card.category == category.name)
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
