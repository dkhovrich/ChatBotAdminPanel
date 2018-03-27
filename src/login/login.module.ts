import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginCacheService } from './login-cache.service';
import { AuthActions } from './login.actions';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    LoginService,
    LoginCacheService,
    AuthActions
  ]
})
export class LoginModule { }
