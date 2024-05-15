import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectClientsList = (state: AppState) => state.clientsList;

export const selectAllClients = createSelector(
  selectClientsList,
  (clientsList) => {
    return {
      data: clientsList.clientsList,
      items: clientsList.items,
    };
  }
);
