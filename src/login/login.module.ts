import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginActions } from './login.actions';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    LoginService,
    LoginActions
  ]
})
export class LoginModule { }
