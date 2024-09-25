import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, first, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.user$.pipe(
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
  }
  
}
