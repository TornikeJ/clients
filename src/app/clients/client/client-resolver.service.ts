import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Client } from '../clients.model';
import {ClientService} from "./client.service";
import {inject} from "@angular/core";

export const clientResolver: ResolveFn<Client[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(ClientService).getClient(+route.paramMap.get('clientNumber')!);
};
