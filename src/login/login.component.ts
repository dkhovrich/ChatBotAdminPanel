import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginActions } from './login.actions';
import { IAppState } from "../redux/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private loginActions: LoginActions,
    private loginService: LoginService) {
    this.createForm();
  }

  onSubmit(): void {
    const email: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;

    this.loginService.login(email, password)
      .subscribe(token => {
        this.loginActions.token = token;
        this.loginForm.reset();
      });
  }

  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('', [Validators.required])
    });
  }
}
