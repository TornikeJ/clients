import { createReducer, on } from '@ngrx/store';
import { ClientListResponse } from '../../../clients.model';
import * as ClientListActions from './clients-list.actions';

type status = string | 'pending' | 'loading' | 'error' | 'success';

export interface ClientsListState {
  clientsList: ClientListResponse | null;
  error: string | null;
  status: status;
}

export const initialState: ClientsListState = {
  clientsList: null,
  error: null,
  status: 'pending',
};

export const clientsListReducer = createReducer(
  initialState,
  on(ClientListActions.loadClientsList, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ClientListActions.loadClientsSuccess, (state, { clientsList }) => ({
    ...state,
    clientsList,
    error: '',
    status: 'success',
  })),
  on(ClientListActions.loadClientsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(ClientListActions.addClient, (state) => state)
);
