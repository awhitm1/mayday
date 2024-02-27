import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    router.navigate(['/queue']);
    return false;
  } else {
    return true;
  }

};
