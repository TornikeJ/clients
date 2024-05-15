import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client, ClientImage } from '../clients.model';
import { delay } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  getClient(clientNumber: number) {
    return this.http
      .get<Client[]>(
        `http://localhost:3001/clients-list/?clientNumber=${clientNumber}`
      )
      .pipe(delay(3000));
    //delay resolver-ისთვის
  }

  updateClient(client: Client) {
    return this.http.put('http://localhost:3001/clients-list/' + client.id, {
      ...client,
    });
  }

  uploadImage(req: { imageUrl: any; id: string }) {
    return this.http.post('http://localhost:3001/clients-media/', { ...req });
  }

  getClientImage(id: string) {
    return this.http.get<ClientImage>(
      'http://localhost:3001/clients-media/' + id
    );
  }

  updateImage(req: { imageUrl: any; id: string }) {
    return this.http.put('http://localhost:3001/clients-media/' + req.id, {
      ...req,
    });
  }
}
