import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);
  public user$ = new BehaviorSubject<User | null>(null)

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/auth/currentuser').pipe(
      tap((user: User) =>{
        this.user$.next(user)
          if(user) {
            this.isLoggedin$.next(true)
          } else {
            this.isLoggedin$.next(false)
          }
      })
    )
  }

  public inscription(user: User) {
    return this.http.post<User>('/api/user', user);
  }

  public connexion(data: { 
    email: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>('/api/auth/connexion', data).pipe(
      tap((user: User) => {
        if(user) {
          this.user$.next(user)
          this.isLoggedin$.next(true);
        }
      })
    );
  }

  public logout() : Observable<any> {
    return this.http.get('/api/auth/logout').pipe(
      tap(() => {
        this.user$.next(null)
      })
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {}

}
