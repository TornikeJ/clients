import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientComponent} from './client/client.component';
import {clientResolver} from './client/client-resolver.service';
import {canDeactivateGuard} from "./client/can-deactivate.guard";

const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
  },
  {
    path: 'client/:clientNumber',
    component: ClientComponent,
    resolve: {client: clientResolver},
    canDeactivate: [canDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {
}
