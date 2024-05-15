import {Observable} from "rxjs";
import {CanDeactivateFn, UrlTree} from '@angular/router';
import { ClientComponent } from './client.component';

export type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export const canDeactivateGuard: CanDeactivateFn<ClientComponent> = (
  component: ClientComponent
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
