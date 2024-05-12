import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-actions',
  templateUrl: './custom-actions.component.html',
  styleUrls: ['./custom-actions.component.scss'],
})
export class CustomActionsComponent {
  @Input() actions!: string[];

  @Output() actionClicked: EventEmitter<string> = new EventEmitter();

  doAction(action: string): void {
    this.actionClicked.emit(action);
  }
}
