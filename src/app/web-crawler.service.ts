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

  getBBC():Observable<{ headline: string; description: string }[]> {
    return new Observable((observer) => {
      console.log('Service: Starting HTTP request to', this.url);

      this.http.get(this.url, { responseType: 'text' }).subscribe({
        next: (response: string) => {
          console.log('Service: Raw HTML response received');

          const $ = cheerio.load(response);

          // Extract headlines and descriptions separately
          const headlines: string[] = [];
          const descriptions: string[] = [];

          // Find all card headlines
          $('[data-testid="card-headline"]').each((_, element) => {
            const headline = $(element).text().trim();
            headlines.push(headline);
          });

          // Find all card descriptions
          $('[data-testid="card-description"]').each((_, element) => {
            const description = $(element).text().trim();
            descriptions.push(description);
          });

          // Pair headlines and descriptions by their index
          const cardDetails = headlines.map((headline, index) => ({
            headline,
            description: descriptions[index] || 'No description available', // Fallback if description is missing
          }));

          console.log('Service: Parsed card details:', cardDetails);

          if (cardDetails.length > 0) {
            observer.next(cardDetails);
          } else {
            observer.error('No card details found.');
          }
          observer.complete();
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
