import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  NgIterable,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() iconName!: string;
  @Input() label!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() control!: AbstractControl;
  @Input() options!: NgIterable<any>;
  @Input() disabled!: boolean;


  @Output() iconClicked: EventEmitter<void> = new EventEmitter();
  onChange!: (value: string) => void;
  onTouched!: () => void;
  value!: string;
  @Input() labelKey!: string;
  @Input() valueKey!: string;

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

  hasError(control: AbstractControl) {
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
