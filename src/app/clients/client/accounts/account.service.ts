import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account.model';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  addClientAccount(account: Account) {
    account.accountNumber =
      'GE04SP' + Math.floor(100000 + Math.random() * 900000000);
    account.status = 'ACTIVE';
    return this.http.post('http://localhost:3001/accounts/', { ...account });
  }

  updateClientAccount(account: Account) {
    return this.http.put('http://localhost:3001/accounts/' + account.id, {
      ...account,
    });
  }

  getClientAccounts(clientNumber: number) {
    return this.http.get<Account[]>(
      'http://localhost:3001/accounts/?clientNumber=' + clientNumber,
    );
  }
}
