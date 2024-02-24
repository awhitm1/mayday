import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
		pathMatch: 'full',
		loadComponent: () => import('./core/landing/landing.component').then((c) => c.LandingComponent),
  },
  {path: 'auth',
    pathMatch: 'full',
    loadComponent: () => import('./features/auth/auth.component').then((c) => c.AuthComponent),
  },
  {path: 'queue',
    pathMatch: 'full',
    loadComponent: () => import('./shared/queue/queue.component').then((c) => c.QueueComponent),
  },
  {path: 'kanban',
    pathMatch: 'full',
    loadComponent: () => import('./shared/kanban/kanban.component').then((c) => c.KanbanComponent),
  },
  {path: 'profile',
    pathMatch: 'full',
    loadComponent: () => import('./features/profile/profile.component').then((c) => c.ProfileComponent),
  },
  {path: 'settings',
    pathMatch: 'full',
    loadComponent: () => import('./features/settings/settings.component').then((c) => c.SettingsComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
