import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as urlJoin from 'url-join';

import { APP_BASE_URL } from '../tokens';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_BASE_URL) private baseUrl: string) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: urlJoin(this.baseUrl, req.url)
    });

    return next.handle(req);
  }
}
