import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataStreamService} from '../../data-stream.service'
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private streamService: DataStreamService) {
  }

  pages: number = 1;
  pageArray = [1];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.streamService.pagesChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(pages => {
        this.pages = pages;
        this.pageArray = Array.apply(null, {length: this.pages}).map((value, index) => index + 1);

      });


  }

  getPage(page) {
    this.streamService.updatePage(page)
  }

}
