import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './auth/connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { DataUserGuard } from './shared/guard/data-user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'connexion', canActivate: [DataUserGuard], component: ConnexionComponent },
  { path: 'inscription', canActivate: [DataUserGuard],component: InscriptionComponent },
  { path: 'profil' ,component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
