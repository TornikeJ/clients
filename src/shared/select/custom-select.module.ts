import { NgModule } from '@angular/core';
import { CustomSelectComponent } from './custom-select.component';
import { FormsModule } from '@angular/forms';
import {JsonPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from '@angular/common';

@NgModule({
  declarations: [CustomSelectComponent],
  imports: [FormsModule, TitleCasePipe, JsonPipe, NgClass, NgIf, NgForOf],
  exports: [CustomSelectComponent],
})
export class CustomSelectModule {}
