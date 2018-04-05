import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { ModalActions } from '../../modal/modal.actions';

import { ModalComponentEnum } from '../../modal/modal-components.enum';

export interface IModal {
  component?: ModalComponentEnum;
  data?: any;
}

export const modalReducer: Reducer<IModal> = (state: IModal = <IModal>{}, action: FluxStandardAction<IModal>) => {
  switch (action.type) {
    case ModalActions.SHOW: {
      return { component: action.payload.component, data: action.payload.data };
    }
    case ModalActions.HIDE: {
      return { component: null, data: null };
    }
    default: return state;
  }
};
