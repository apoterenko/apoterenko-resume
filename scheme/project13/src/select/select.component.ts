import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  forwardRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as R from 'ramda';

import { ILabeledValue } from '../../../../core/converter/value/value-converter.interface';
import { ISelectionAction } from './select-interfaces';

import { SelectionToolsPlugin } from './selection-tools.plugin';

export type SelectInputValueType = number|string|ILabeledValue[];

@Component({
  selector: 'app-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  @Input() filterEnabled = false;
  @Input() options: ILabeledValue[] = [];
  @Input() actions: Array<ISelectionAction> = [];

  @Input() styles: CSSStyleDeclaration;

  @Output() onSelect: EventEmitter<ILabeledValue[]> = new EventEmitter<ILabeledValue[]>();
  @Output() clickAction: EventEmitter<ISelectionAction> = new EventEmitter<ISelectionAction>();

  @ViewChild('input') inputRef: ElementRef;

  sortType: string;
  optionsOpened = false;

  private _inputMode = false;
  private _disabled;
  private _canSelectMultipleItem = true;
  private _closableSelectedItem = true;
  private _readonly = true;
  private _multiple = false;
  private _active: ILabeledValue[];
  private _autoAlignEnabled = false;
  private selectionToolsPlugin: SelectionToolsPlugin;

  private onChange: Function = () => {};

  @Input()
  set closableSelectedItem(value: boolean) {
    this._closableSelectedItem = this.nvl(value, this._closableSelectedItem);
  }

  @Input()
  set readonly(value: boolean) {
    this._readonly = this.nvl(value, this._readonly);
  }

  @Input()
  set autoAlignEnabled(autoAlignEnabled: boolean) {
    this._autoAlignEnabled = this.nvl(autoAlignEnabled, this._autoAlignEnabled);
  }

  @Input()
  set multiple(value: boolean) {
    this._multiple = this.nvl(value, this._multiple);
  }

  @Input()
  set controlDisabled(value: boolean) {
    this._disabled = this.nvl(value, this._disabled);

    if (this._disabled) {
      this.hideOptions();
    }
  }

  get autoAlignEnabled(): boolean {
    return this._autoAlignEnabled;
  }

  get canSelectMultipleItem(): boolean {
    return this._canSelectMultipleItem;
  }

  get closableSelectedItem(): boolean {
    return this._closableSelectedItem;
  }

  get multiple(): boolean {
    return this._multiple;
  }

  get readonly(): boolean {
    return this._readonly;
  }

  get disabled(): boolean {
    return this._disabled || undefined;
  }

  get inputMode(): boolean {
    return this._inputMode;
  }

  get active(): SelectInputValueType {
    return this._active;
  }

  @Input()
  set active(activeValue: SelectInputValueType) {
    this._active = activeValue as ILabeledValue[] || [];

    if (['string', 'number'].includes(typeof this._active)) {
      const option = this.lookupAtOptions(activeValue as string | number);
      if (option) {
        this._active = [ this.fromOption(option) ];
      } else {
        this._active = [ { value: this._active } ];
      }
    }
    if (this.canSelectMultipleItem && this.multiple && this._active.length) {
      this._active[0].selected = true;
    }
  }

  constructor(
    public element: ElementRef,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
  ) {
    this.element = element;
    this.clickedOutside = this.clickedOutside.bind(this);
    this.selectionToolsPlugin = new SelectionToolsPlugin(this);
  }

  writeValue(value: any): void {
    this.active = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
  }

  isItemContextExist(item: ILabeledValue): boolean {
    return item.context && !!Object.keys(item.context).length;
  }

  canCloseItem(item: ILabeledValue): boolean {
    return this.closableSelectedItem
      && !!this._active.length
      && this.lookupAtOptions(item.value).canRemove !== false;
  }

  actionClick(action: ISelectionAction, $event: Event): void {
    this.stopEvent($event);

    this.selectionToolsPlugin.handle(action);
    this.clickAction.emit(action);
  }

  get displayPlaceholder(): string|number {
    return !!this._active.length ?  this.extractDisplayValue(this._active[0]) : (this.placeholder || '');
  }

  get filteredActiveItems(): ILabeledValue[] {
    return (this.active as ILabeledValue[]).filter(value => !value.removed);
  }

  extractDisplayValue(item: ILabeledValue): string|number {
    let itemAtOptions = item;
    if (!itemAtOptions.label) {
      itemAtOptions = this.lookupAtOptions(item.value) || item;
    }
    return itemAtOptions.label
      ? this.translateService.instant(itemAtOptions.label)
      : itemAtOptions.value;
  }

  toDisplayValue(item: ILabeledValue): SafeHtml {
    let displayValue: string;

    if (item.label) {
      displayValue = item.label;
    } else {
      const option = this.lookupAtOptions(item.value);
      if (option) {
        displayValue = option.label;
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(
      displayValue
        ? this.translateService.instant(displayValue)
        : item.value
    );
  }

  clickedOutside(): void {
    this._inputMode = false;
    this.optionsOpened = false;
  }

  onActiveItemClick(item: ILabeledValue, $event: MouseEvent): void {
    this.stopEvent($event);

    if (this.canSelectMultipleItem) {
      this._active.forEach(labeledValue => labeledValue.selected = false);
      if (!item.selected) {
        item.selected = true;
      }
      this.emitSelectActive();
    }
  }

  isInputVisible(): boolean {
    return !this.multiple || !this._active.length;
  }

  onRemoveItem(item: ILabeledValue, $event: Event): void {
    this.stopEvent($event);
    item.selected = false;
    item.removed = true;

    this.selectAtLeastOne();
    this.emitSelectActive();
  }

  onInputClick($event: Event): void {
    this.stopEvent($event);
    this.hideOptions();
  }

  onMatchClick($event: Event): void {
    this.stopEvent($event);

    if (this._disabled === true) {
      return;
    }

    this._inputMode = !this._inputMode;
    if (this._inputMode) {
      this.open();
    } else {
      this.hideOptions();
    }
  }

  isActive(option: ILabeledValue): boolean {
    return !!this._active.find(v => v.value === option.value && !v.removed);
  }

  private open(): void {
    this.optionsOpened = true;
  }

  private hideOptions(): void {
    this._inputMode = false;
    this.optionsOpened = false;
  }

  onSelectMatch($event: Event, option: ILabeledValue): void {
    this.stopEvent($event);

    if (this.multiple) {
      if (this.isActive(option)) {
        this.hideOptions();
        return;
      }
      let item = this._active.find(v => v.value === option.value);
      if (item) {
        delete item.removed;
      } else {
        this._active.push(item = this.fromOption(option));
      }
      this.selectAtLeastOne();
    } else {
      this._active = [ this.fromOption(option) ];
    }
    this.onChange(this._active);
    this.emitSelectActive();

    this.hideOptions();
  }

  private stopEvent($event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();
  }

  private nvl(value: boolean, defaultValue: boolean): boolean {
    return R.isNil(value) ? defaultValue : value;
  }

  private lookupAtOptions(value: number|string): ILabeledValue {
    return (this.options || []).find(item => String(item.value) === String(value));
  }

  private fromOption(option: ILabeledValue): ILabeledValue {
    return { value: option.value };
  }

  private selectAtLeastOne(): void {
    if (!this._active.find(v => v.selected && !v.removed)) {
      const item = this._active.find(v => !v.selected && !v.removed);
      if (item) {
        item.selected = true;
      }
    }
  }

  private emitSelectActive(): void {
    this.onSelect.emit(this._active);
  }
}
