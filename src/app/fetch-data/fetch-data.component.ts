import { Component } from '@angular/core';
import {WebCrawlerService} from "../web-crawler.service";
import {NgForOf, NgIf} from "@angular/common";
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-fetch-data',
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './fetch-data.component.html',
  standalone: true,
  styleUrl: './fetch-data.component.css'
})
export class FetchDataComponent {
  headlines: string[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private webCrawlerService: WebCrawlerService) {}

  returnCardHeadlines()
  {
    this.loading = true;
    this.webCrawlerService.getBBC().subscribe({
      next: (data) => {
        this.headlines = data;
        console.log('Component: Received headlines:', data);
      },
      error: (error) => {
        this.errorMessage = `Error fetching headlines: ${error}`;
        console.error('Component: Error:', error);
      },
      complete: () => {
        this.loading = false;
        console.log('Component: Subscription complete');
      }
    });
  }
  // ngOnInit(): void {
  //   this.loading = true;
  //   this.webCrawlerService.getBBC().subscribe({
  //     next: (data) => {
  //       this.headlines = data;
  //       console.log('Component: Received headlines:', data);
  //     },
  //     error: (error) => {
  //       this.errorMessage = `Error fetching headlines: ${error}`;
  //       console.error('Component: Error:', error);
  //     },
  //     complete: () => {
  //       this.loading = false;
  //       console.log('Component: Subscription complete');
  //     }
  //   });
  //}
}
