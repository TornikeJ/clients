import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { phoneValidator } from '../../../../shared/validators/phone-validator';
import { languageValidator } from '../../../../shared/validators/language-validator';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  styleUrls: ['./add-client-modal.component.scss'],
})
export class AddClientModalComponent implements OnInit {
  addClientForm!: FormGroup;
  genders = [
    { desc: 'Female', value: 'F' },
    { desc: 'Male', value: 'M' },
  ];
  countries = [
    { desc: 'Georgia', value: 'Georgia' },
    { desc: 'Czechia', value: 'Czechia' },
    { desc: 'Germany', value: 'Germany' },
  ];

  constructor(private dialogRef: MatDialogRef<AddClientModalComponent>) {}

  ngOnInit() {
    this.addClientForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        languageValidator(),
      ]),
      surname: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        languageValidator(),
      ]),
      gender: new FormControl<string>(''),
      clientId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      phoneNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        phoneValidator(),
      ]),
      legalAddress: new FormControl<string>('', [Validators.required]),
      legalCountry: new FormControl<string>('', [Validators.required]),
      legalCity: new FormControl<string>('', [Validators.required]),
      factAddress: new FormControl<string>('', [Validators.required]),
      factCountry: new FormControl<string>('', [Validators.required]),
      factCity: new FormControl<string>('', [Validators.required]),
    });
  }

  onSubmit(addClientFormGroup: FormGroup) {
    if (addClientFormGroup.invalid) {
      addClientFormGroup.markAllAsTouched();
      return;
    }
    this.transformRequest();
    this.dialogRef.close(addClientFormGroup.value);
  }

  private transformRequest() {
    this.addClientForm
      .get('phoneNumber')
      ?.setValue(+this.addClientForm.get('phoneNumber')?.value);
    this.addClientForm
      .get('clientId')
      ?.setValue(+this.addClientForm.get('clientId')?.value);
  }

  close() {
    this.dialogRef.close();
  }
}
