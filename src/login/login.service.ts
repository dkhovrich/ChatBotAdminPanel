import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';

@Injectable()
export class LoginService extends BaseHttpService {
  private readonly loginUrl: string = 'acc_login';

  constructor(http: HttpClient) {
    super(http);
  }

  login(email: string, password: string): Observable<string> {
    const model = { email, password };
    return this.http.post<string>(this.loginUrl, model)
      .pipe(
        map(res => res['Authorization']),
        catchError(this.handleError(this.loginUrl))
      );
  }
}
