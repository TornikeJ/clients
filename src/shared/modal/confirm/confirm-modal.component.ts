import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  title!: string;
  message!: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string },
  ) {}


  ngOnInit(): void {
    this.message = this.data.message;
    this.title = this.data.title;
  }

  close() {
    this.dialogRef.close();
  }
  confirm() {
    this.dialogRef.close(true);
  }
}
