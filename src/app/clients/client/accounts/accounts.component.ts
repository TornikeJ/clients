import { Component, Input, OnInit } from '@angular/core';
import { Account, Currencies } from './account.model';
import { map, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { AccountService } from './account.service';
import { ConfirmModalComponent } from '../../../../shared/modal/confirm/confirm-modal.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [AccountService],
})
export class AccountsComponent implements OnInit {
  @Input() clientNumber!: string;
  $accounts!: Observable<Account[]>;

  constructor(
    private modalService: MatDialog,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.getClientAccounts();
  }

  doAction(action: string, account: Account): void {
    if (action === 'edit') {
      this.modalService
        .open(AccountModalComponent, {
          hasBackdrop: true,
          disableClose: true,
          data: { clientNumber: +this.clientNumber, account },
        })
        .afterClosed()
        .subscribe((account: Account) => {
          if (account) {
            delete account.currencies;
            this.accountService
              .updateClientAccount(account)
              .subscribe((result) => {
                if (result) {
                  this.getClientAccounts();
                }
              });
          }
        });
    } else if (action === 'close' || action === 'activate') {
      this.modalService
        .open(ConfirmModalComponent, {
          hasBackdrop: true,
          data: {
            title: 'Confirmation',
            message: `Are you sure you want to ${action} this account?`,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            const req = { ...account };
            delete req.currencies;
            req.status = action === 'close' ? 'CLOSED' : 'ACTIVE';
            this.accountService.updateClientAccount(req).subscribe((result) => {
              if (result) {
                this.getClientAccounts();
              }
            });
          }
        });
    }
  }

  openAccountModal() {
    this.modalService
      .open(AccountModalComponent, {
        hasBackdrop: true,
        disableClose: true,
        data: { clientNumber: +this.clientNumber },
      })
      .afterClosed()
      .subscribe((account: Account) => {
        if (account) {
          this.accountService.addClientAccount(account).subscribe((result) => {
            if (result) {
              this.getClientAccounts();
            }
          });
        }
      });
  }

  private getClientAccounts() {
    this.$accounts = this.accountService
      .getClientAccounts(+this.clientNumber)
      .pipe(
        map((accounts) => {
          return accounts.map((account) => {
            const currencies = Object.keys(account.currency).filter(
              (key: string) => {
                return account.currency[key as Currencies];
              },
            );
            return { ...account, currencies };
          });
        }),
      );
  }

  getActions(account: Account) {
    return account.status === 'ACTIVE'
      ? ['edit', 'close']
      : ['edit', 'activate'];
  }
}
