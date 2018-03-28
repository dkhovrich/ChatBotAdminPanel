import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthLoggedInGuard } from '../guards/auth-logged-in.guard.service';
import { HomeRoutingModule } from './home-routing.module';
import { LoginModule } from '../login/login.module';
import { GlossaryModule } from '../glossary/glossary.module';

import { AuthActions } from '../login/login.actions';
import { GlossaryService } from '../glossary/glossary.service';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule,
    SharedModule,
    LoginModule,
    HomeRoutingModule,
    GlossaryModule
  ],
  exports: [HomeComponent],
  providers: [
    AuthLoggedInGuard,
    AuthActions,
    GlossaryService
  ]
})
export class HomeModule { }
