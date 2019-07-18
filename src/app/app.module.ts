import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/landing-page/connexion/connexion.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { InscriptionComponent } from './components/landing-page/inscription/inscription.component';
import { HomeComponent } from './components/landing-page/home/home.component';
import { NavbarComponent } from './components/landing-page/navbar/navbar.component';
import { FooterComponent } from './components/landing-page/footer/footer.component';
import { TodoRifComponent } from './components/user/todo-rif/todo-rif.component';
import { TodoAjoutComponent } from './components/user/todo-ajout/todo-ajout.component';
import { TodoModifComponent } from './components/user/todo-modif/todo-modif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import {ToastrModule,ToastNoAnimation,ToastNoAnimationModule} from 'ngx-toastr'

import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { UserService } from './services/user.service';
import { TodoService } from './services/todo.service';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    DeconnexionComponent,
    InscriptionComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TodoRifComponent,
    TodoAjoutComponent,
    TodoModifComponent,
    AdminpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule,
    MatButtonModule, 
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    TodoService,
    UserGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
