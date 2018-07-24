import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { GlossaryActions } from '../../glossary/glossary.actions';
import { IPagination } from '../../pagination/pagination.models';
import { IGlossaryModel } from '../../glossary/glossary.models';

export interface IGlossary {
  data: IPagination<IGlossaryModel>;
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
        return { ...state, data: payload.data };
      }
      case GlossaryActions.CREATE: {
        const item = action.payload as IGlossaryModel;
        const data: IPagination<IGlossaryModel> = { ...state.data };
        data.content = [...data.content, item];

        return { ...state, data };
      }
      case GlossaryActions.UPDATE: {
        const item = action.payload as IGlossaryModel;
        const data: IPagination<IGlossaryModel> = { ...state.data };
        data.content = updateGlossary(data.content, item);

        return { ...state, data };
      }
      case GlossaryActions.REMOVE: {
        const item = action.payload as IGlossaryModel;
        const data: IPagination<IGlossaryModel> = { ...state.data };
        data.content = data.content.filter(i => i.id !== item.id);

        return { ...state, data };
      }
      default: return state;
    }
  };
