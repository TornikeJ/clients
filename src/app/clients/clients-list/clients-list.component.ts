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

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  providers: [ClientsListService],
})
export class ClientsListComponent implements OnInit {
  $clients!: Observable<ClientsList[]>;
  search: FormControl<number> = new FormControl();
  actions: string[] = ['edit', 'delete'];
  pageEvent!: PageEvent;
  length!: number;
  pageSize!: number;
  pageIndex!: number;

  constructor(
    private clientsListService: ClientsListService,
    private modalService: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.pageIndex = +(this.route.snapshot.queryParamMap.get('pageIndex') || 1);
    this.pageSize = +(this.route.snapshot.queryParamMap.get('pageSize') || 5);
    this.getClientList();
  }

  getClientList() {
    this.$clients = this.clientsListService
      .getClientsList(this.pageIndex, this.pageSize)
      .pipe(
        tap((response) => {
          this.length = response.items;
          const queryParams: NavigationExtras = {
            queryParams: {
              pageSize: this.pageSize,
              pageIndex: this.pageIndex,
            },
          };
          this.router.navigate([], queryParams);
        }),
        map((response) => response.data),
      );
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
          this.$clients =
            this.clientsListService.getClientsListByFullDetails(result);
        }
      });
  }

  searchClient(clientNumber: number) {
    this.$clients =
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
      this.router.navigate(['client', client.clientNumber]);
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
}
