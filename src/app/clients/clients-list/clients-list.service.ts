import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, ClientListResponse, ClientsList } from '../clients.model';

@Injectable()
export class ClientsListService {
  constructor(private http: HttpClient) {}

  getClientsList(pageIndex: number, pageSize: number, sortBy?: string) {
    return this.http.get<ClientListResponse>(
      `http://localhost:3001/clients-list/?_page=${pageIndex}&_per_page=${pageSize}&_sort=${sortBy}`
    );
  }

  getClientsListByClientNumber(clientNumber: number) {
    return this.http.get<ClientsList[]>(
      `http://localhost:3001/clients-list?clientNumber=${clientNumber}`
    );
  }

  getClientsListByFullDetails(params: ClientsList) {
    const { clientNumber, phoneNumber, clientId, surname, name, legalCountry } =
      params;
    let requestParams = '?';
    if (clientNumber) requestParams += `clientNumber=${clientNumber}&`;
    if (phoneNumber) requestParams += `phoneNumber=${phoneNumber}&`;
    if (clientId) requestParams += `clientId=${clientId}&`;
    if (surname) requestParams += `surname=${surname}&`;
    if (name) requestParams += `name=${name}&`;
    if (legalCountry) requestParams += `legalCountry=${legalCountry}`;

    return this.http.get<ClientsList[]>(
      `http://localhost:3001/clients-list` + requestParams
    );
  }

  addClient(params: Client) {
    const clientNumber = Math.floor(100000 + Math.random() * 900000);
    return this.http.post<Client>(`http://localhost:3001/clients-list/`, {
      ...params,
      clientNumber,
    });
  }

  deleteClient(id: string) {
    return this.http.delete(`http://localhost:3001/clients-list/${id}`);
  }
}
