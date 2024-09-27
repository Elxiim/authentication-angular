import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedin$.pipe(
    first(),
    tap((isLoggedin: boolean) => {
      if (!isLoggedin) {
        router.navigateByUrl('/connexion');
      }
    })
  );
};
