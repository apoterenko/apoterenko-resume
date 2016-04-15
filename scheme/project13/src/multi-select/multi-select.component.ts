import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  forwardRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IGridColumn } from '../../grid/grid.interface';

import { GridComponent } from '../../grid/grid.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-multi-select',
  styleUrls: ['./multi-select.component.scss'],
  templateUrl: './multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ],
})
export class MultiSelectComponent implements OnDestroy, OnInit, AfterViewInit, ControlValueAccessor {
  styles: CSSStyleDeclaration = {} as CSSStyleDeclaration;
  gridStyles: CSSStyleDeclaration = {} as CSSStyleDeclaration;
  @Input() height: number;
  @Input() columnsFrom: IGridColumn[];
  @Input() columnsTo: IGridColumn[];
  @Input() columnsTranslationKeyFrom: string;
  @Input() columnsTranslationKeyTo: string;
  @Input() rowsFilterFrom: Function;
  @Input() rowsFrom: any[];
  @Input() syncFormControlChanges = true;

  @ViewChild('gridFrom') gridFrom: GridComponent;
  @ViewChild('gridTo') gridTo: GridComponent;

  private _rowDoubleSelectFromSubscription;
  private _rowDoubleSelectToSubscription;
  private _active: any[] = [];
  private onChange: Function = () => {};
  private onTouched: Function = () => {};

  constructor(private changeDetector: ChangeDetectorRef) {}

  get filteredRowsFrom(): any[] {
    return this.rowsFrom.filter(
      (row: any) => (!this.rowsFilterFrom || this.rowsFilterFrom(row)) && (
        !this._active.length || !this._active.find((selectedRecord: any) => selectedRecord === row)
      )
    );
  }

  get rowsTo(): any[] {
    return this._active;
  }

  ngOnInit(): void {
    this.styles.height = this.gridStyles.height = this.gridStyles.minHeight = this.height + 'px';
  }

  ngAfterViewInit(): void {
    this._rowDoubleSelectFromSubscription = this.gridFrom.onDblClick.subscribe(() => {
      this.onRightAction();
      this.changeDetector.markForCheck();
    });
    this._rowDoubleSelectToSubscription = this.gridTo.onDblClick.subscribe(() => {
      this.onLeftAction();
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._rowDoubleSelectFromSubscription.unsubscribe();
    this._rowDoubleSelectToSubscription.unsubscribe();
  }

  writeValue(records: any[]): void {
    if (Array.isArray(records)) {
      this._active = records;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  onRightAction(): void {
    this._active = this._active.concat(this.gridFrom.selected);
    this.updateState();
  }

  onRightDoubleAction(): void {
    this._active = [];
    this._active = this._active.concat(this.rowsFrom);
    this.updateState();
  }

  onLeftAction(): void {
    this._active = this._active.filter((record: any) =>
      !this.gridTo.selected.find((selectedRecord) => selectedRecord === record));
    this.updateState();
  }

  onLeftDoubleAction(): void {
    this._active = [];
    this.updateState();
  }

  public syncChanges(): void {
    this.syncActiveChanges();
  }

  private updateState(): void {
    this.gridTo.selected = [];
    this.gridFrom.selected = [];

    if (this.syncFormControlChanges) {
      this.syncActiveChanges();
    }
  }

  private syncActiveChanges(): void {
    this.onChange(this.rowsTo);
  }
}
