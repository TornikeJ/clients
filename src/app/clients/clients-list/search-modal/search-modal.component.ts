import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
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
