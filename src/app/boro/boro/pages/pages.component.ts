import {Component, OnInit, Input} from '@angular/core';
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


  @Input() pageArray = [1];
  currentPage = 1;
  pages = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.streamService.pagesChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(pages => {
        this.updatePages()
      });
    this.updatePages();

  }

  getPage(page) {
    this.streamService.updatePage(page);
    this.currentPage = this.streamService.currentPage;
    this.updatePages()
  }

  updatePages() {
    if (!this.pageArray.length) {
      this.pageArray = [1, 2, 3];
    }
    let start = this.currentPage === 1 ? 1 : this.currentPage === 2 ? 2 : this.currentPage - 2;
    this.pages = this.pageArray.slice(start - 1, this.currentPage + 3)
  }
}
