import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';

@Injectable()
export class LoginService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<string> {
    const model = { email, password };
    return this.http.post<string>('acc_login', model)
      .pipe(
        map(res => res['Authorization']),
        catchError(this.handleError)
      );
  }
}
