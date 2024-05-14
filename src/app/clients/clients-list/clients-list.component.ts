import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Client, ClientsList } from '../clients.model';
import { ClientsListService } from './clients-list.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { AddClientModalComponent } from './add-client-modal/add-client-modal.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/modal/confirm/confirm-modal.component';
import { PageEvent } from '@angular/material/paginator';
import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import {selectAllClients, selectClientsList} from './state/clients/clients-list.selectors';
import {loadClientsList} from "./state/clients/clients-list.actions";
import {AppState} from "./state/app.state";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  animations: [
    trigger('flyInOut', [
      state(
        'in',
        style({
          width: '*',
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition(':enter', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate(
            '0.3s 0.1s ease',
            style({
              transform: 'translateX(0)',
              width: '*',
            })
          ),
          animate(
            '0.3s ease',
            style({
              opacity: 1,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class ClientsListComponent implements OnInit {
  clients$!: Observable<ClientsList[] | undefined>;
  search: FormControl<number> = new FormControl();
  actions: string[] = ['edit', 'delete'];
  pageEvent!: PageEvent;
  length!: number | undefined;
  pageSize!: number;
  pageIndex!: number;
  sortBy = '';

  constructor(
    private clientsListService: ClientsListService,
    private modalService: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.pageIndex = +(this.route.snapshot.queryParamMap.get('pageIndex') || 1);
    this.pageSize = +(this.route.snapshot.queryParamMap.get('pageSize') || 5);
    this.store.dispatch(loadClientsList({pageIndex: this.pageIndex, pageSize:this.pageSize, sortBy: this.sortBy})); // Dispatch the action with parameters
    this.clients$ = this.store.select(selectAllClients)
      .pipe(
        tap((response) => {
          this.length = response?.items;
          const queryParams: NavigationExtras = {
            queryParams: {
              pageSize: this.pageSize,
              pageIndex: this.pageIndex,
            },
          };
          this.router.navigate([], queryParams);
        }),
        map((response) => response?.data)
      );
  }

  getClientList() {
    this.store.dispatch(loadClientsList({pageIndex: this.pageIndex, pageSize:this.pageSize, sortBy: this.sortBy})); // Dispatch the action with parameters
  }

  openDetailedSearchModal() {
    this.modalService
      .open(SearchModalComponent, {
        hasBackdrop: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result: ClientsList) => {
        if (result) {
          this.clients$ =
            this.clientsListService.getClientsListByFullDetails(result);
        }
      });
  }

  searchClient(clientNumber: number) {
    this.clients$ =
      this.clientsListService.getClientsListByClientNumber(clientNumber);
  }

  openAddClientModal() {
    this.modalService
      .open(AddClientModalComponent, {
        hasBackdrop: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((client: Client) => {
        if (client) {
          this.clientsListService.addClient(client).subscribe((result) => {
            if (result) {
              this.getClientList();
            }
          });
        }
      });
  }

  doAction(action: string, client: ClientsList): void {
    if (action === 'edit') {
      this.router.navigate(['clients-list/client', client.clientNumber]);
    } else if (action === 'delete') {
      this.modalService
        .open(ConfirmModalComponent, {
          hasBackdrop: true,
          data: {
            title: 'Confirmation',
            message: `Are you sure you want to delete this client?`,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.clientsListService
              .deleteClient(client.id)
              .subscribe((result) => {
                if (result) {
                  this.getClientList();
                }
              });
          }
        });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getClientList();
  }

  sort(sortBy: string) {
    if (sortBy !== this.sortBy && '-' + sortBy !== this.sortBy) {
      this.sortBy = sortBy;
    } else if (sortBy === this.sortBy) {
      this.sortBy = '-' + this.sortBy;
    } else if ('-' + sortBy === this.sortBy) {
      this.sortBy = '';
    }
    this.getClientList();
  }
}
