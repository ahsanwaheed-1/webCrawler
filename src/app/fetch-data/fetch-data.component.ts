import { Component } from '@angular/core';
import {WebCrawlerService} from "../web-crawler.service";
import {NgForOf, NgIf} from "@angular/common";

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
  cardDetails: { headline: string; description: string }[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private webCrawlerService: WebCrawlerService) {}

  get_Headlines_Descriptions_from_BBC(): void {
    this.loading = true;

    this.webCrawlerService.getBBC().subscribe({
      next: (data) => {
        this.cardDetails = data;
        console.log('Component: Received card details:', data);
      },
      error: (error) => {
        this.errorMessage = `Error fetching card details: ${error}`;
        console.error('Component: Error:', error);
      },
      complete: () => {
        this.loading = false;
        console.log('Component: Subscription complete');
      }
    });
  }
}
