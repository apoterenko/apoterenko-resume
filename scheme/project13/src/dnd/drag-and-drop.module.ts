import {
  NgModule,
} from '@angular/core';

import { DragulaModule } from 'ng2-dragula';

import { DragAndDropDomHelper } from './drag-and-drop.dom-helper';
import { DragAndDropComponentPluginFactory } from './drag-and-drop.component.plugin';

@NgModule({
  imports: [
    DragulaModule,
  ],
  exports: [
    DragulaModule,
  ],
  providers: [
    DragAndDropComponentPluginFactory,
    DragAndDropDomHelper,
  ]
})
export class DragAndDropModule {
}
