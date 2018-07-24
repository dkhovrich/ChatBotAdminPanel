import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { GlossaryActions } from '../../glossary/glossary.actions';
import { IGlossaryModel } from '../../glossary/glossary.models';

export interface IGlossary {
  items?: IGlossaryModel[];
  pageNumber?: number;
  pageSize?: number;
  total?: number;
}

const updateGlossary = (items: IGlossaryModel[], glossary: IGlossaryModel) => {
  return items.map(item => {
    if (item.id !== glossary.id) { return item; }
    return { ...item, ...glossary };
  });
};

export const glossaryReducer: Reducer<IGlossary> =
  (state: IGlossary = <IGlossary>{}, action: FluxStandardAction<IGlossary | IGlossaryModel>) => {
    switch (action.type) {
      case GlossaryActions.LOAD: {
        const payload = action.payload as IGlossary;

        return {
          ...state,
          items: payload.items,
          pageNumber: payload.pageNumber,
          pageSize: payload.pageSize,
          total: payload.total
        };
      }
      case GlossaryActions.CREATE: {
        const item = action.payload as IGlossaryModel;
        const items: IGlossaryModel[] = [item, ...state.items];
        return { ...state, items };
      }
      case GlossaryActions.UPDATE: {
        const item = action.payload as IGlossaryModel;
        const items: IGlossaryModel[] = updateGlossary(state.items, item);

        return { ...state, items };
      }
      case GlossaryActions.REMOVE: {
        const item = action.payload as IGlossaryModel;
        const items: IGlossaryModel[] = state.items.filter(i => i.id !== item.id);

        return { ...state, items };
      }
      default: return state;
    }
  };
