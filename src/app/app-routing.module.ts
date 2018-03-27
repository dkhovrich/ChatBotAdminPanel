import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './app-routes';
import { LoginComponent } from '../login/login.component';
import { AuthLoggedOutGuard } from '../guards/auth-logged-out.guard.service';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.Login, pathMatch: 'full' },
  { path: AppRoutes.Login, component: LoginComponent, canActivate: [AuthLoggedOutGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
