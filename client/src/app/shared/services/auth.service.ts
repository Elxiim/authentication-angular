import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$ = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  public inscription(user: User) {
    return this.http.post<User>('/api/user', user);
  }

  public connexion(data: { email: string, password: string }) {
    return this.http.post<User>('/api/auth/connexion', data).pipe(
      tap((user: User) => {
        if(user) {
          this.user$.next(user)
        }
      })
    );
  }
}
