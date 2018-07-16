import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private ngRedux: NgRedux<IAppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.ngRedux.getState().auth.token;
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', token)
      });
    }

    return next.handle(req);
  }
}
