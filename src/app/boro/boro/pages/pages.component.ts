import {Component, OnInit,Input} from '@angular/core';
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

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {

  }

  getPage(page) {
    this.streamService.updatePage(page);
  }


}
