import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseHttpService } from '../services/base-http.service';
import { IGlossaryModel } from './glossary.models';

@Injectable()
export class GlossaryService extends BaseHttpService {
  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<IGlossaryModel[]> {
    return this.http.get<IGlossaryModel[]>('glossary_all')
      .pipe(
        catchError(this.handleError('glossary_all', []))
      );
  }
}
