import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as ClientsActions from './clients-list.actions';
import { ClientsListService } from '../../clients-list.service';
import { of, tap } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientsListService,
    private router: Router
  ) {}

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClientsList),
      mergeMap(({ pageIndex, pageSize, sortBy }) =>
        this.clientService.getClientsList(pageIndex, pageSize, sortBy).pipe(
          map((response) =>
            ClientsActions.loadClientsSuccess({ clientsList: response })
          ),
          catchError((error) =>
            of(ClientsActions.loadClientsFailure({ error }))
          )
        )
      )
    )
  );
}
