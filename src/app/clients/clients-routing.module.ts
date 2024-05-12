import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { clientResolver } from './client/client-resolver.service';

const routes: Routes = [
  {
    path: 'client/:clientNumber',
    component: ClientComponent,
    resolve: { client: clientResolver },
  },
  { path: 'clients-list', component: ClientsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
