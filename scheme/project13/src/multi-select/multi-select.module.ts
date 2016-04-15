import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { GridModule } from '../../grid/grid.module';

import { MultiSelectComponent } from './multi-select.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    GridModule,
  ],
  declarations: [
    MultiSelectComponent,
  ],
  exports: [
    MultiSelectComponent,
  ]
})
export class MultiSelectModule {
}
