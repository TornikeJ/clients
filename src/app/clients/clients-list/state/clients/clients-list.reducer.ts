import { createReducer, on } from '@ngrx/store';
import { ClientsList } from '../../../clients.model';
import * as ClientListActions from './clients-list.actions';

export interface ClientsListState {
  clientsList: ClientsList[] | null;
  error: string | null;
  status: string;
  items: number;
  pageSize: number;
  pageIndex: number;
  sortBy: string;
}

export const initialState: ClientsListState = {
  clientsList: null,
  error: null,
  status: 'pending',
  items: 0,
  pageSize: 5,
  pageIndex: 1,
  sortBy: ''
};

export const clientsListReducer = createReducer(
  initialState,
  on(ClientListActions.loadClientsList, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ClientListActions.loadClientsSuccess, (state, { response }) => ({
    ...state,
    clientsList: response.data,
    items: response.items,
    error: '',
    status: 'success',
  })),
  on(ClientListActions.loadClientsByNumberSuccess, (state, { clientsList }) => ({
    ...state,
    clientsList,
    error: '',
    status: 'success',
  })),
  on(ClientListActions.loadClientListByFullDetailsSuccess, (state, { clientsList }) => ({
    ...state,
    clientsList,
    error: '',
    status: 'success',
  })),
  on(ClientListActions.updatePagination, (state, { pageIndex, pageSize }) => ({
    ...state,
    pageIndex,
    pageSize,
  })),
  on(ClientListActions.updateSorting, (state, { sortBy }) => ({
    ...state,
    sortBy,
  })),
  on(ClientListActions.loadClientsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(ClientListActions.addClient, (state) => state)
);
