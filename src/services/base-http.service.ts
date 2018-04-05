import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

@Injectable()
export abstract class BaseHttpService {
  constructor(protected http: HttpClient) { }

  protected post<T>(url: string, model: T): Observable<T> {
    return this.http.post<T>(url, model)
      .pipe(
        catchError(this.handleError<T>(url))
      );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
