import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GlossaryService } from '../glossary.service';
import { IGlossaryModel } from '../glossary.models';

@Injectable()
export class GlossaryListResolver implements Resolve<IGlossaryModel[]> {
  constructor(private glossaryService: GlossaryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGlossaryModel[]> {
    return this.glossaryService.getAll();
  }
}
