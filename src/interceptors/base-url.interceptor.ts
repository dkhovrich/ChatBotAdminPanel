import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as urlJoin from 'url-join';

import { BASE_URL, BASE_URL_DEVELOPMENT } from '../app/app-settings';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl: string = isDevMode() ? BASE_URL_DEVELOPMENT : BASE_URL;
    req = req.clone({ url: urlJoin(baseUrl, req.url) });

    return next.handle(req);
  }
}
