// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { GestionUsersComponent } from '../../components/gestion-users/gestion-users.component';
import { StatUsersComponent } from '../../components/stat-users/stat-users.component';
import { StatTodosComponent } from '../../components/stat-todos/stat-todos.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    ChartsModule,
    TabsModule
    
  ],
  declarations: [
 
    GestionUsersComponent,
    StatUsersComponent,
    StatTodosComponent
  ]
})
export class ThemeModule { }
