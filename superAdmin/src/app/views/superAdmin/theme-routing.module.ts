import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GestionUsersComponent } from '../../components/gestion-users/gestion-users.component';
import { StatTodosComponent } from '../../components/stat-todos/stat-todos.component';
import { StatUsersComponent } from '../../components/stat-users/stat-users.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'SuperAdmin'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'gestion-users',
        component: GestionUsersComponent,
        data: {
          title: 'Gestion Users'
        }
      },
      {
        path: 'stats-users',
        component: StatUsersComponent,
        data: {
          title: 'Statistiques Users'
        }
      },
      {
        path: 'stats-todos',
        component: StatTodosComponent,
        data: {
          title: 'Statistiques Todos'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
