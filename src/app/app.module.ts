import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './auth-token.interceptor';
import { NavComponent } from "./core/nav/nav.component";
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ProfileComponent } from './features/profile/profile.component';
import { SpinnerComponent } from "./shared/spinner/spinner.component";
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        provideHttpClient(withInterceptors([authTokenInterceptor])),
        provideAnimationsAsync(),
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { dateFormat: 'medium' }
        },
        {
          provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NavComponent, ProfileComponent,
        SpinnerComponent
    ]
})
export class AppModule { }
