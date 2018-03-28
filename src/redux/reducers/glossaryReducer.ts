import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { GlossaryActions } from '../../glossary/glossary.actions';
import { IGlossaryModel } from '../../glossary/glossary.models';

export interface IGlossary {
  items: IGlossaryModel[];
}

export const glossaryReducer: Reducer<IGlossary> = (state: IGlossary = <IGlossary>{}, action: FluxStandardAction<IGlossary>) => {
  switch (action.type) {
    case GlossaryActions.LOAD: {
      return { ...state, items: action.payload.items };
    }
    default: return state;
  }
}
