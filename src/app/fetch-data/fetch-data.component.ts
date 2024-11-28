import { Component } from '@angular/core';
import {WebCrawlerService} from "../web-crawler.service";
import {NgIf} from "@angular/common";
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-fetch-data',
  imports: [
    NgIf
  ],
  templateUrl: './fetch-data.component.html',
  standalone: true,
  styleUrl: './fetch-data.component.css'
})
export class FetchDataComponent {
  htmlContent: string = '';
  errMsg: string = '';

  constructor(private WebCrawlerService: WebCrawlerService) {}

  getData(): void {
    console.log('Component: Subscribing to getBBC()');

    this.WebCrawlerService.getBBC().subscribe({
      next: (headline) => {
        console.log('Component: Received headline:', headline);
        this.htmlContent   = headline; // Update the UI
      },
      error: (error) => {
        console.error('Component: Error occurred:', error);
        this.errMsg = error; // Show error message
      },
      complete: () => {
        console.log('Component: Subscription complete');
      },
    });
  }
}
