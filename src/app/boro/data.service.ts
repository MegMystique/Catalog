import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import {DataStreamService} from './data-stream.service';
import { Headers, RequestOptions ,HttpModule ,Http ,Response} from '@angular/http'
import {AuthService} from '../auth.service'
@Injectable()
export class DataService {


  constructor(private http: HttpClient, private streamService:DataStreamService,private authService: AuthService) { }
  getDataFromServer() {
     //const headers = this.authService.getHeaders();
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });
    return this.http.get('assets/catalog.json')
      //.delay(1000) тут можно проверить что есть спинер загрузки
      .subscribe((res: Response) => {this.streamService.setCards(res);});


  }
}
