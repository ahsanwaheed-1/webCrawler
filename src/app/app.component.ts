import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FetchDataComponent} from "./fetch-data/fetch-data.component";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, FetchDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webcrawler';
}
