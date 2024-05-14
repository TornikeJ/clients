import { createAction, props } from '@ngrx/store';
import { Client, ClientListResponse } from '../../../clients.model';

export const loadClientsList = createAction(
  '[Clients] Fetch Clients List',
  props<{ pageIndex: number; pageSize: number; sortBy: string }>()
);
export const loadClientsSuccess = createAction(
  '[Clients] Load ClientsList Success',
  props<{ clientsList: ClientListResponse }>()
);
export const loadClientsFailure = createAction(
  '[Clients] Load Clients Failure',
  props<{ error: any }>()
);

export const addClient = createAction(
  '[Client] Add Client',
  props<{ client: Client }>()
);

export const addClientSuccess = createAction(
  '[Clients] Load ClientsList Success',
  props<{ client: Client }>()
);
export const addClientFailure = createAction(
  '[Clients] Load Clients Failure',
  props<{ error: any }>()
);
