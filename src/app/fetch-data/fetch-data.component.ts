import { Component } from '@angular/core';
import {WebCrawlerService} from "../web-crawler.service";

@Component({
  selector: 'app-fetch-data',
  imports: [],
  templateUrl: './fetch-data.component.html',
  styleUrl: './fetch-data.component.css'
})
export class FetchDataComponent {
  html: string='';
  error:string='';

  constructor(private WebCrawlerService: WebCrawlerService ) {}

  getData(): void {
    this.WebCrawlerService.getDataFromBBC().subscribe({
      next:(response)=>{
        this.html=response;
      },
      error:()=>{
        this.error='Error fetching data'
      }
    })
  }
}
