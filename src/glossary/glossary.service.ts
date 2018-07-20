import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';
import { IGlossaryModel } from './glossary.models';

@Injectable()
export class GlossaryService extends BaseHttpService {
  private readonly url: string = 'glossaries';

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<IGlossaryModel[]> {
    return this.http.get<IGlossaryModel[]>(this.url)
      .pipe(
        catchError(this.handleError(this.url, []))
      );
  }

  create(model: IGlossaryModel): Observable<IGlossaryModel> {
    return this.http.post<IGlossaryModel>(this.url, model);
  }

  update(id: string, model: IGlossaryModel): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, model, { responseType: 'text' });
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
