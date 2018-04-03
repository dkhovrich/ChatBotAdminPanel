import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { GlossaryActions } from '../../glossary/glossary.actions';
import { IGlossaryModel } from '../../glossary/glossary.models';

export interface IGlossary {
  items?: IGlossaryModel[];
}

const updateGlossary = (items: IGlossaryModel[], glossary: IGlossaryModel) => {
  return items.map(item => {
    if (item.id !== glossary.id) return item;
    return { ...item, ...glossary };
  });
}

export const glossaryReducer: Reducer<IGlossary> = (state: IGlossary = <IGlossary>{}, action: FluxStandardAction<IGlossary | IGlossaryModel>) => {
  switch (action.type) {
    case GlossaryActions.LOAD: {
      const items: IGlossaryModel[] = (action.payload as IGlossary).items;
      return { ...state, items };
    }
    case GlossaryActions.CREATE: {
      const item = action.payload as IGlossaryModel;
      return { ...state, items: [item, ...state.items] };
    }
    case GlossaryActions.UPDATE: {
      const item = action.payload as IGlossaryModel;
      const items: IGlossaryModel[] = updateGlossary(state.items, item);

      return { ...state, items };
    }
    default: return state;
  }
}
