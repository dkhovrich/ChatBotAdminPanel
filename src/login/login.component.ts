import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './login.service';
import { LoginCacheService } from './login-cache.service';
import { AuthActions } from './login.actions';
import { AppRoutes } from '../app/app-routes';
import { DEFAULT_DEV_EMAIL } from '../app/app-settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private submitted = false;
  form: FormGroup;

  constructor(
    private router: Router,
    private authActions: AuthActions,
    private loginService: LoginService,
    private loginCacheService: LoginCacheService,
    private toastrService: ToastrService) {
    this.createForm();
  }

  onSubmit(): void {
    this.submitted = true;
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    this.loginService.login(email, password)
      .subscribe(token => {
        this.authActions.login(token);
        this.loginCacheService.saveToken(token);
        this.form.reset();
        this.router.navigateByUrl(`${AppRoutes.Home}/${AppRoutes.Glossary}`);
      }, () => {
        this.form.get('password').setValue('');
        this.toastrService.error('You have entered an invalid username or password', 'Login error', { closeButton: true });
        this.submitted = false;
      });
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('', [Validators.required])
    });

    if (isDevMode()) {
      this.form.get('email').setValue(DEFAULT_DEV_EMAIL);
    }
  }
}
