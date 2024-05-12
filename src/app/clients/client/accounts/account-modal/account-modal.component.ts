import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account, Currencies } from '../account.model';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {
  accountForm!: FormGroup;
  account!: Account;
  clientNumber!: number;
  accountTypes = [
    { desc: 'Current', value: 'Current' },
    { desc: 'Saving', value: 'Saving' },
    { desc: 'Funded', value: 'Funded' },
  ];

  currencies: Currencies[] = ['GEL', 'USD', 'EUR'];
  selectedCurrencies = {
    GEL: true,
    USD: false,
    EUR: false,
  };
  disabledCurrencies = {
    GEL: false,
    USD: false,
    EUR: false,
  };
  checkboxError!: string;

  constructor(
    private dialogRef: MatDialogRef<AccountModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { clientNumber: number; account: Account },
  ) {}

  ngOnInit() {
    this.accountForm = new FormGroup({
      accountNumber: new FormControl<string>({ value: '', disabled: true }),
      currency: new FormControl(this.selectedCurrencies),
      status: new FormControl<string>({ value: '', disabled: true }),
      type: new FormControl<string>('', [Validators.required]),
    });
    this.clientNumber = this.data.clientNumber;

    if (this.data.account) {
      this.account = this.data.account;
      this.accountForm.patchValue({ ...this.account });
      this.selectedCurrencies = { ...this.account.currency };
      this.disabledCurrencies = { ...this.account.currency };
      this.accountForm.get('currency')?.setValue(this.selectedCurrencies);
    }
  }

  onSubmit(accountFormGroup: FormGroup) {
    if (this.currencyIsNotSelected() || accountFormGroup.invalid) {
      accountFormGroup.markAllAsTouched();
      return;
    }

    let request = {};

    if (this.account) {
      request = {
        ...this.account,
        ...accountFormGroup.value,
      };
    } else {
      request = {
        clientNumber: this.clientNumber,
        ...accountFormGroup.value,
      };
    }
    this.dialogRef.close(request);
  }

  currencyIsNotSelected() {
    this.checkboxError = '';
    let noneSelected = true;
    this.currencies.forEach((currency) => {
      if (this.selectedCurrencies[currency]) {
        noneSelected = false;
      }
    });

    if (noneSelected) {
      this.checkboxError = 'At least one currency must be selected';
    }

    return noneSelected;
  }

  updateSelectedCurrencies(currency: Currencies) {
    this.accountForm.get('currency')?.markAsDirty();
    this.selectedCurrencies[currency] = !this.selectedCurrencies[currency];
    this.accountForm.get('currency')?.setValue(this.selectedCurrencies);
  }

  close() {
    this.dialogRef.close();
  }
}
