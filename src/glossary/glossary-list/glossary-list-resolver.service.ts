import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GlossaryService } from '../glossary.service';
import { IPagination } from '../../pagination/pagination.models';
import { IGlossaryModel, GlossaryRequest } from '../glossary.models';

@Injectable()
export class GlossaryListResolver implements Resolve<IPagination<IGlossaryModel>> {
  constructor(private glossaryService: GlossaryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagination<IGlossaryModel>> {
    return this.glossaryService.get(new GlossaryRequest());
  }
}
