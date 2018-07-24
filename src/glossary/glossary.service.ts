import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';
import { IPagination } from '../pagination/pagination.models';
import { IGlossaryModel } from './glossary.models';
import { IBaseRequest } from '../models/request';

@Injectable()
export class GlossaryService extends BaseHttpService {
  private readonly url: string = 'glossaries';

  constructor(http: HttpClient) {
    super(http);
  }

  get(data: IBaseRequest): Observable<IPagination<IGlossaryModel>> {
    return this.http.get<IPagination<IGlossaryModel>>(this.url, { params: data.toHttpParams() })
      .pipe(
        catchError(this.handleError(this.url, null))
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
