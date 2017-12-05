import {Component, OnInit, Input} from '@angular/core';
import {DataStreamService} from '../../data-stream.service'
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() category;
  isOpen = false;

  constructor(private streamService: DataStreamService) {
  }

  ngOnInit() {
  }

  update(category) {
    this.streamService.img = category.image;


  }

}
