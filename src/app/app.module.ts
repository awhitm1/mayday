import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './auth-token.interceptor';
import { NavComponent } from "./core/nav/nav.component";
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideAnimationsAsync(),
        {
          provide: DATE_PIPE_DEFAULT_OPTIONS,
          useValue: { dateFormat: 'medium'}
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NavComponent
    ]
})
export class AppModule { }
