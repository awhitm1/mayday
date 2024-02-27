import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  // if (authToken) {
  //   const authReq = req.clone({
  //     headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  //   })
  //   return next(authReq)
  // } else {
  //   return next(req)
  // }

  const authReq = authToken ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  })
  : req;
  return next(authReq);
}
