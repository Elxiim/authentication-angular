import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '';

  public isLoggedin$: Observable<boolean> = this.authservice.isLoggedin$.asObservable() // asObservable()

  constructor(private authservice: AuthService, private router: Router) {}

  public logout() {
    this.authservice.logout().subscribe(() => {
      this.router.navigateByUrl('/connexion')
    })
    
  }
}
