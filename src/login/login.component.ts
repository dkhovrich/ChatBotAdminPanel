import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginCacheService } from './login-cache.service';
import { AuthActions } from './login.actions';
import { IAppState } from "../redux/store";
import { AppRoutes } from '../app/app-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private authActions: AuthActions,
    private loginService: LoginService,
    private loginCacheService: LoginCacheService) {
    this.createForm();
  }

  onSubmit(): void {
    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    this.loginService.login(email, password)
      .subscribe(token => {
        this.authActions.login(token);
        this.loginCacheService.saveToken(token);
        this.form.reset();
        this.router.navigateByUrl(`${AppRoutes.Home}/${AppRoutes.Glossary}`);
      });
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('e@mail.com', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('12345678', [Validators.required])
    });
  }
}
