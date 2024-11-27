import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebCrawlerService {

  private url='/bbc/';
  constructor(private http: HttpClient) {
  }

  getBBC():Observable<string> {
    return this.http.get(this.url,{responseType: 'text'});
  }
}
