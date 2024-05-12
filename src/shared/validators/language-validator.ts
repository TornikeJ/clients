import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const English = 'abcdefghijklmnopqrstuvwxyz '.split('');
const Georgian = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ '.split('');

export function languageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = control.value;
    let isGeorgian = true;
    let isEnglish = true;
    if (text) {
      text.split('').forEach((letter: string) => {
        if (isGeorgian && Georgian.indexOf(letter) === -1) {
          isGeorgian = false;
        }
        if (isEnglish && English.indexOf(letter.toLowerCase()) === -1) {
          isEnglish = false;
        }
      });
    } else {
      return null;
    }

    return (!isGeorgian && !isEnglish)
      ? {
          languageFormat: {
            invalid: true,
            message: 'Please use either Georgian or English letters',
          },
        }
      : null;
  };
}
