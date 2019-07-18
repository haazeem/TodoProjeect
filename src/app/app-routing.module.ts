import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/landing-page/home/home.component';
import { ConnexionComponent } from './components/landing-page/connexion/connexion.component';
import { InscriptionComponent } from './components/landing-page/inscription/inscription.component';
import { TodoRifComponent } from './components/user/todo-rif/todo-rif.component';
import { TodoAjoutComponent } from './components/user/todo-ajout/todo-ajout.component';
import { TodoModifComponent } from './components/user/todo-modif/todo-modif.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';

import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'todo-rif',
    component: TodoRifComponent,
    canActivate : [UserGuard]
  },
  {
    path: 'todo-ajout',
    component: TodoAjoutComponent,
    canActivate : [UserGuard]
  },
  {
    path: 'todo-modif',
    component: TodoModifComponent,
    canActivate : [UserGuard]
  },
  {
    path :'adminPage',
    component :AdminpageComponent,
    canActivate : [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
