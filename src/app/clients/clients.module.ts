import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchModalComponent } from './clients-list/search-modal/search-modal.component';
import { AddClientModalComponent } from './clients-list/add-client-modal/add-client-modal.component';
import { CustomInputModule } from '../../shared/input/custom-input.module';
import { CustomSelectModule } from '../../shared/select/custom-select.module';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CustomActionsModule } from '../../shared/actions/custom-actions.module';
import { AccountsComponent } from './client/accounts/accounts.component';
import { AccountModalComponent } from './client/accounts/account-modal/account-modal.component';
import { ConfirmModalComponent } from '../../shared/modal/confirm/confirm-modal.component';
import { ClientService } from './client/client.service';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientComponent,
    SearchModalComponent,
    AddClientModalComponent,
    AccountsComponent,
    AccountModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    CustomInputModule,
    CustomSelectModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    CustomActionsModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [ClientService],
})
export class ClientsModule {}
