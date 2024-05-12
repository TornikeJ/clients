import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() iconName!: string;
  @Input() label!: string;
  @Input() id!: string;
  @Input() disabled!: boolean;
  @Input() control!: AbstractControl;

  @Output() iconClicked: EventEmitter<void> = new EventEmitter();

  onChange!: (value: string) => void;
  onTouched!: () => void;
  value!: string;
  onblur!: boolean;

  setValue() {
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  iconEvent() {
    this.iconClicked.emit();
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.iconClicked.emit();
    }
  }

  onBlur() {
    this.onblur = true;
  }

  onFocus() {
    this.onblur = false;
  }

  hasError(control: AbstractControl) {
    return control?.invalid && (control?.touched || control?.dirty);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
