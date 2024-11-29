import { Component } from '@angular/core';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";

@Component({
  selector: 'app-root',
    imports: [FetchDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webcrawler';
}
