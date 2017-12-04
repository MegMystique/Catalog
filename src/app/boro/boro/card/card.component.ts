import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';
import {DataStreamService} from '../../data-stream.service'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card;


  constructor(private streamService: DataStreamService) {
  }

  ngOnInit() {
    this.card.showCloseButton = false
  }

  closeCard(card) {
    this.streamService.deleteCard(card)
  }

}
