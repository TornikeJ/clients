import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  title!: string;
  message!: string;

  constructor(
    private dialogRef: MatDialogRef<InfoModalComponent>,
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
