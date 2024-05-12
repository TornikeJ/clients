import { NgModule } from '@angular/core';
import { CustomInputComponent } from './custom-input.component';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [CustomInputComponent],
  imports: [FormsModule, TitleCasePipe, JsonPipe, NgClass, NgIf],
  exports: [CustomInputComponent],
})
export class CustomInputModule {}
