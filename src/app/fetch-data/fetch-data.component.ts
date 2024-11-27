import { Component } from '@angular/core';
import {WebCrawlerService} from "../web-crawler.service";
import {NgIf} from "@angular/common";

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
    this.WebCrawlerService.getBBC().subscribe({
      next:(response)=>{
        this.htmlContent=response;
      },
      error:()=>{
        this.errMsg='Error fetching data'
      }
    })
  }
}
