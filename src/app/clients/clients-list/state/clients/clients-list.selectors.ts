import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectClientsList = (state: AppState) => state.clientsList;

export const selectAllClients = createSelector(
  selectClientsList,
  (clientsList) => clientsList.clientsList // Return the clients list directly
);
