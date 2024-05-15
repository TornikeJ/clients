import { createAction, props } from '@ngrx/store';
import {Client, ClientListResponse, ClientsList} from '../../../clients.model';

export const loadClientsList = createAction(
  '[Clients] Fetch Clients List',
);

export const loadClientListByClientNumber = createAction(
  '[Clients] Fetch Clients List by client number',
  props<{ clientNumber: number}>()
);

export const loadClientListByFullDetails = createAction(
  '[Clients] Fetch Clients List by Full details',
  props<{ client: ClientsList}>()
);

export const loadClientsByNumberSuccess = createAction(
  '[Clients] Load ClientsList by Number Success',
  props<{ clientsList: ClientsList[]  }>()
);

export const loadClientListByFullDetailsSuccess = createAction(
  '[Clients] Load ClientsList by Full Details Success',
  props<{ clientsList: ClientsList[]  }>()
);

export const loadClientsSuccess = createAction(
  '[Clients] Load ClientsList Success',
  props<{ response: ClientListResponse  }>()
);
export const loadClientsFailure = createAction(
  '[Clients] Load Clients Failure',
  props<{ error: any }>()
);

export const addClient = createAction(
  '[Client] Add Client',
  props<{ client: Client }>()
);

export const updatePagination = createAction(
  '[Clients] Update Pagination',
  props<{ pageIndex: number; pageSize: number }>()
);

export const updateSorting = createAction(
  '[Clients] Update Sorting',
  props<{ sortBy: string }>()
);
