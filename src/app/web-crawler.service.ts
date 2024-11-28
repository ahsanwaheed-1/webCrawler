import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import * as cheerio from 'cheerio';

@Injectable({
  providedIn: 'root'
})
export class WebCrawlerService {

  private url='/bbc/';
  constructor(private http: HttpClient) {
  }

  getBBC():Observable<string[]> {
    return new Observable<string[]>((observer) => {
      console.log('Service: Starting HTTP request to', this.url);

      this.http.get(this.url, { responseType: 'text' }).subscribe({
        next: (response: string) => {
          console.log('Service: Raw HTML response received');

          // Parse HTML with Cheerio
          const $ = cheerio.load(response);

          // Extract all headlines
          const headlines: string[] = [];
          $('h2[data-testid="card-headline"]').each((_, element) => {
            const headline = $(element).text().trim();
            headlines.push(headline);
          });

          console.log('Service: Parsed headlines:', headlines);

          observer.next(headlines); // Emit the headlines array
          observer.complete();      // Mark the observable as complete
        },
        error: (err) => {
          console.error('Service: Error fetching HTML:', err);
          observer.error(err);
        },
        complete: () => {
          console.log('Service: HTTP request complete');
        }
      });
    });
  }
}
