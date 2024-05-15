import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query('.form-group', [
          style({ opacity: 0, scale: 0.8 }),
          group([
            animate(
              '0.3s 0.1s ease',
              style({
                scale: 1,
                width: '*',
              })
            ),
            animate(
              '0.5s ease',
              style({
                opacity: 1,
              })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class SearchModalComponent implements OnInit {
  detailedSearchGroup!: FormGroup;

  constructor(private dialogRef: MatDialogRef<SearchModalComponent>) {}

  ngOnInit() {
    this.detailedSearchGroup = new FormGroup({
      name: new FormControl<string>(''),
      surname: new FormControl<string>(''),
      legalCountry: new FormControl<string>(''),
      clientNumber: new FormControl<number | null>(null),
      clientId: new FormControl<number | null>(null),
      phoneNumber: new FormControl<number | null>(null),
    });
  }

  onSubmit(detailedSearchGroup: FormGroup) {
    this.dialogRef.close(detailedSearchGroup.value);
  }

  close() {
    this.dialogRef.close();
  }
}
