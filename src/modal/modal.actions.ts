import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';

import { BaseActionService } from '../services/base-action.service';
import { IAppState } from '../redux/store';
import { IModal } from '../redux/reducers/modalReducer';
import { ModalComponentEnum } from './modal-components.enum';

@Injectable()
export class ModalActions extends BaseActionService {
  static SHOW: string = 'SHOW_ACTION';
  static HIDE: string = 'HIDE_ACTION';

  constructor(private ngRedux: NgRedux<IAppState>) {
    super();
  }

  show<T>(component: ModalComponentEnum, data: T = null): void {
    const action = this.createAction<IModal>(ModalActions.SHOW, { component, data });
    this.ngRedux.dispatch(action);
  }

  hide(): void {
    const action = this.createAction<IModal>(ModalActions.HIDE);
    this.ngRedux.dispatch(action);
  }
}
