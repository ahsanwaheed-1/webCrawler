import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebCrawlerService {

  constructor(private http: HttpClient) {}

  private url='/bbc/';

  getDataFromBBC():Observable<string> {
    return this.http.get(this.url,{responseType: 'text'});
  }
}
