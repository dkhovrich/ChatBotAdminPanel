import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';
import { IGlossaryModel } from './glossary.models';

@Injectable()
export class GlossaryService extends BaseHttpService {
  private readonly getAllUrl: string = 'glossary_all';
  private readonly createUrl: string = 'glossary_add';
  private readonly updateUrl: string = 'glossary_update';

  constructor(http: HttpClient) {
    super(http);
  }

  getAll(): Observable<IGlossaryModel[]> {
    return this.http.get<IGlossaryModel[]>(this.getAllUrl)
      .pipe(
        catchError(this.handleError(this.getAllUrl, []))
      );
  }

  create(model: IGlossaryModel): Observable<IGlossaryModel> {
    return this.post(this.createUrl, model);
  }

  update(model: IGlossaryModel): Observable<IGlossaryModel> {
    return this.post(this.updateUrl, model);
  }
}
