import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SelectComponent } from './select.component';
import { RawDataFilterPipe } from './select-pipes';
import { OffClickDirective } from './off-click';
import { AlignmentDirective } from '../../../directives/alignment/alignment.directive';
import { FocusDirective } from '../../../directives/focus/focus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    AlignmentDirective,
    SelectComponent,
    RawDataFilterPipe,
    OffClickDirective,
    FocusDirective,
  ],
  exports: [
    SelectComponent,
    OffClickDirective
  ]
})
export class SelectModule {
}
