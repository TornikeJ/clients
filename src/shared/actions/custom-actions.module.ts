import { NgModule } from '@angular/core';
import { CustomActionsComponent } from './custom-actions.component';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';

@NgModule({
  declarations: [CustomActionsComponent],
  imports: [NgForOf, CdkMenu, CdkMenuTrigger, CdkMenuItem, TitleCasePipe],
  exports: [CustomActionsComponent],
})
export class CustomActionsModule {}
