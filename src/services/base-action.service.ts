import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

@Injectable()
export abstract class BaseActionService {
  protected createAction<T>(type: string, payload?: T): FluxStandardAction<T> {
    return { type, payload, meta: null };
  }
}
