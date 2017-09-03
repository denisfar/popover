import { Injectable }              from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()

/*
* execute json request once when AppService is creating
* return Observable object on getPriceList()
*/
export class AppService {


  data: Observable<any>;
  constructor(private http: Http) {

    this.data = this.getPrice();
  }


  handleResponse(res: Response): any {
    let body = res.json() || {};
    return body;
  }

  handleError(error: Response | any) {
    console.log('error', error);
    return error;
  }

  httpGet(url: string): Observable<any> {
    return this.http
                   .get(url, {})
                   .map(this.handleResponse.bind(this))
                   .catch(this.handleError);
  }


  getPrice() {
    return this.httpGet('./ssl.json');
  }


  getPriceList(){
    return this.data;
  }
}
