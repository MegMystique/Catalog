import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {DataStreamService} from './data-stream.service';
import { Headers, RequestOptions ,HttpModule ,Http ,Response} from '@angular/http'
import {AuthService} from '../auth.service'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {


  constructor(private http: Http, private streamService:DataStreamService,private authService: AuthService) { }
  getDataFromServer() {
    return this.http.request('http://93.91.165.233:8081/frontend_data/catalog.json')
      .map(data=>data.json())
      .subscribe(data=>this.streamService.setCards(data),err => console.error(err),)


  }
}
