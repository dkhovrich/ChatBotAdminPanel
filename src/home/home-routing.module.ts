import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../app/app-routes';
import { AuthLoggedInGuard } from '../guards/auth-logged-in.guard.service';
import { HomeComponent } from './home.component';
import { GlossaryListComponent } from '../glossary/glossary-list/glossary-list.component';
import { GlossaryListResolver } from '../glossary/glossary-list/glossary-list-resolver.service';

const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: HomeComponent,
    canActivate: [AuthLoggedInGuard],
    children: [
      {
        path: AppRoutes.Glossary,
        component: GlossaryListComponent,
        resolve: {
          data: GlossaryListResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
