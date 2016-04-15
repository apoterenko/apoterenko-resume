import { AfterViewInit, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ILabeledValue } from '../../../../core/converter/value/value-converter.interface';
import {
  IDynamicFormControl,
  IDynamicFormItem,
  ISelectItemsPayload
} from '../../form/dynamic-form/dynamic-form-control.interface';

import { DynamicFormComponent } from '../../form/dynamic-form/dynamic-form.component';

export interface IEntityBaseComponentExtension<T> {
  onInit(): void;
  onAfterInit(): void;
  onChanges(changes: T): void;
  onSelectItems(payload: ISelectItemsPayload): void;
}

export class TranslationFieldsExtension<T> implements IEntityBaseComponentExtension<T> {

  private _currentSelectedItem: ILabeledValue;

  constructor(
    private entityBaseComponent: EntityBaseComponent<T>,
    private displayControlName: string,
    private translatedControlName: string
  ) {
  }

  onInit(): void {
    const dynamicDisplayControl: IDynamicFormControl = this.flattenFormControls(this.entityBaseComponent.controls)
      .find((control: IDynamicFormControl) => this.displayControlName === control.controlName);

    // Form does not exist yet => resort to source entity
    const entityTranslatedControlValue: ILabeledValue[] = this.entityBaseComponent.editedEntity[this.translatedControlName];
    if (!Array.isArray(entityTranslatedControlValue) || !entityTranslatedControlValue.length) {
      dynamicDisplayControl.disabled = true;
    }
  }

  private flattenFormControls(formControls: Array<IDynamicFormItem>): Array<IDynamicFormControl> {
    return formControls.reduce((acc, control: any) => {
      const controls = control.children ? this.flattenFormControls(control.children) : [ control ];
      return [
        ...acc,
        ...controls
      ];
    }, [] as Array<IDynamicFormControl>);
  }

  onAfterInit(): void {
    this.patchDisplayControlValue();
  }

  onChanges(changes: T): void {
    const currentSelectedItem: ILabeledValue = this.currentSelectedItem;
    if (currentSelectedItem) {
      if (this.displayControlValue) {
        currentSelectedItem.context = currentSelectedItem.context || {};
        currentSelectedItem.context.translation = this.displayControlValue;
      } else {
        delete currentSelectedItem.context;
      }
    }
  }

  onSelectItems(payload: ISelectItemsPayload): void {
    this._currentSelectedItem = payload.items.find((item: ILabeledValue) => item.selected);

    if (this.currentSelectedItem) {
      this.displayControl.enable({ onlySelf: true });
    } else {
      this.displayControl.disable({ onlySelf: true });
    }
    this.patchDisplayControlValue();
    this.translatedControl.markAsDirty();
  }

  private patchDisplayControlValue(): void {
    const currentSelectedItem: ILabeledValue = this.currentSelectedItem;
    if (currentSelectedItem) {
      if (currentSelectedItem.context && currentSelectedItem.context.hasOwnProperty('translation')) {
        this.patchDisplayControl(currentSelectedItem.context.translation);
      } else {
        this.patchDisplayControl();
      }
    } else {
      this.patchDisplayControl();
    }
  }

  private patchDisplayControl(value: string = ''): void {
    this.displayControl.patchValue(value);
  }

  private get currentSelectedItem(): ILabeledValue {
    if (this._currentSelectedItem) {
      return this._currentSelectedItem;
    }
    const selectedValues: ILabeledValue[] = this.translatedControlValue;
    if (!Array.isArray(selectedValues)) {
      return null;
    }
    return selectedValues.find((item: ILabeledValue) => item.selected);
  }

  private get translatedControlValue(): ILabeledValue[] {
    return this.formGroup.value[this.translatedControlName];
  }

  private get displayControlValue(): string {
    return this.formGroup.value[this.displayControlName];
  }

  private get displayControl(): AbstractControl {
    return this.formGroup.controls[this.displayControlName];
  }

  private get translatedControl(): AbstractControl {
    return this.formGroup.controls[this.translatedControlName];
  }

  private get formGroup(): FormGroup {
    return this.entityBaseComponent.dynamicForm.form;
  }
}
