import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;
    return phoneNumber && phoneNumber[0] != '5'
      ? {
          phoneFormat: {
            invalid: true,
            message: 'Number must start with 5',
          },
        }
      : null;
  };
}
