export enum SelectionActionTypeEnum {
  SORT
}

export interface ISelectionAction {
  text: string;
  type: SelectionActionTypeEnum;
  state?: any;
  actionIconCls?: string;
}

export interface IRawDataFilterPipeParams {
  sortType: string;
  filterValue: string;
}
