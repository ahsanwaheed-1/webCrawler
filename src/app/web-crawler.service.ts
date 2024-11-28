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

  getBBC():Observable<string> {
    // return this.http.get(this.url,{responseType: 'text'});
      return new Observable((observer) => {
          console.log('Service: Starting HTTP request to', this.url);

          this.http.get(this.url, { responseType: 'text' }).subscribe({
              next: (response: string) => {
                  try {
                      console.log('Service: Raw HTML response:', response);
                      const $ = cheerio.load(response);

                      // Extract the content with id="card-headline"
                      const headline = $('#card-headline').text().trim();
                      console.log('Service: Parsed headline:', headline);

                      observer.next(headline); // Emit the headline
                  } catch (parseError) {
                      console.error('Service: Parsing error', parseError);
                      observer.error('Error parsing the HTML'); // Emit an error
                  } finally {
                      observer.complete(); // Mark the Observable as complete
                  }
              },
              error: (httpError) => {
                  console.error('Service: HTTP error occurred:', httpError);
                  observer.error('Error fetching data'); // Emit an HTTP error
              },
              complete: () => {
                  console.log('Service: HTTP request complete');
                  observer.complete(); // Ensure the Observable completes
              },
          });
      });
  }
}
