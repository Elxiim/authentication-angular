import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, UrlTree } from '@angular/router';
import { Observable, first, map, mapTo, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

export const dataUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    first(),
    switchMap((user: User | null): Observable<true> => {
      if (!user) {
        return authService.fetchCurrentUser().pipe(mapTo(true));
      } else {
        return of(true);
      }
    })
  );
};


/**
 *     return this.authService.user$.pipe(
      first(),
      switchMap((user: User | null) => {
        if(user) {
          return of(true)
        } else {
          return this.authService.fetchCurrentUser().pipe(
            tap((user: User) => {
              this.authService.user$.next(user)
            }),
            map(() => true)
          )
        }
      })
    )
 */