import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { noAuthGuard } from './no-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full',},

  {path: 'landing',
		loadComponent: () => import('./core/landing/landing.component').then((m) => m.LandingComponent),
    canActivate: [noAuthGuard],
  },

  {path: 'login',
		loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [noAuthGuard],
  },

  {path: 'signup',
		loadComponent: () => import('./core/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [noAuthGuard],
  },

  {path: 'queue',
    loadComponent: () => import('./shared/queue/queue.component').then((m) => m.QueueComponent),
    canActivate: [authGuard],
  },

  {path: 'kanban',
    loadComponent: () => import('./shared/kanban/kanban.component').then((m) => m.KanbanComponent),
    canActivate: [authGuard],
  },

  {path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },

  {path: 'config',
    loadComponent: () => import('./features/config/config.component').then((m) => m.ConfigComponent),
    canActivate: [authGuard],
  },
  {path: 'ticket/:id',
    loadComponent: () => import('./features/ticket/ticket.component').then((m) => m.TicketComponent),
    canActivate: [authGuard],},

  {path: 'ticket/new',
    loadComponent: () => import('./features/ticket/ticket.component').then((m) => m.TicketComponent),
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
