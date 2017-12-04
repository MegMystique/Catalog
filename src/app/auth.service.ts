import {Injectable} from '@angular/core';
import {Http, Response,RequestOptions } from '@angular/http';
// import { Cookie } from 'ng2-cookies';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Headers} from '@angular/http'
import * as _ from "lodash";
@Injectable()
export class AuthService {
  private _headers = new Headers();

  constructor(private http: Http,) {
  }

  get headers() {

    return this._headers
  }

  public getHeaders(): Headers {
    return this.headers
  }
}
