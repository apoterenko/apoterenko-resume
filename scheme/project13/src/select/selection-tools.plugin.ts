import { ISelectionAction, SelectionActionTypeEnum } from './select-interfaces';
import { SelectComponent } from './select.component';

export class SelectionToolsPlugin {

  constructor(private selectComponent: SelectComponent) {
  }

  handle(action: ISelectionAction): void {
    switch (action.type) {
      case SelectionActionTypeEnum.SORT:
        if (action.state === 'down') {
          action.state = 'up';
          action.actionIconCls = 'fa fa-long-arrow-up';
          this.selectComponent.sortType = 'up';
        } else {
          action.state = 'down';
          action.actionIconCls = 'fa fa-long-arrow-down';
          this.selectComponent.sortType = 'down';
        }
        break;
    }
  }
}
