import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as ClientsActions from './clients-list.actions';
import { ClientsListService } from '../../clients-list.service';
import { of, tap } from 'rxjs';
import { State } from '@ngrx/store';
import { AppState } from '../app.state';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientsListService,
    private store: State<AppState>,
    private router: Router
  ) {}

  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClientsList),
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const { pageIndex, pageSize, sortBy } = state.clientsList;
        return this.clientService
          .getClientsList(pageIndex, pageSize, sortBy)
          .pipe(
            tap(() => {
              const queryParams: NavigationExtras = {
                queryParams: {
                  pageSize,
                  pageIndex,
                  sortBy,
                },
              };
              this.router.navigate([], queryParams);
            }),
            map((response) => ClientsActions.loadClientsSuccess({ response })),
            catchError((error) =>
              of(ClientsActions.loadClientsFailure({ error }))
            )
          );
      })
    )
  );

  loadClientsByNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClientListByClientNumber),
      mergeMap(({ clientNumber }) => {
        return this.clientService
          .getClientsListByClientNumber(clientNumber)
          .pipe(
            map((clientsList) => ClientsActions.loadClientsByNumberSuccess({ clientsList })),
            catchError((error) =>
              of(ClientsActions.loadClientsFailure({ error }))
            )
          );
      })
    )
  );

  loadClientsByFullDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.loadClientListByFullDetails),
      mergeMap(({ client }) => {
        return this.clientService
          .getClientsListByFullDetails(client)
          .pipe(
            map((clientsList) => ClientsActions.loadClientListByFullDetailsSuccess({ clientsList })),
            catchError((error) =>
              of(ClientsActions.loadClientsFailure({ error }))
            )
          );
      })
    )
  );

  addClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.addClient),
      withLatestFrom(this.store),
      mergeMap(([{ client }, state]) => {
        const { pageIndex, pageSize, sortBy } = state.clientsList;
        return this.clientService.addClient(client).pipe(
          map(() => ClientsActions.loadClientsList()),
          catchError((error) =>
            of(ClientsActions.loadClientsFailure({ error }))
          )
        );
      })
    )
  );
}
