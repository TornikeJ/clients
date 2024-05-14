import { createAction, props } from '@ngrx/store';
import { ClientListResponse } from '../../../clients.model';

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
