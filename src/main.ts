import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {provideHttpClient} from "@angular/common/http";
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(), // Add this to provide HttpClient
    ],
}).catch(err => console.error(err));

