import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.tokenSubject.pipe(
      take(1),
      exhaustMap(token => {
        const modifiedReq = req.clone({
          params: new HttpParams().set('Authorization', token || "")
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
