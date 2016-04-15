import { AfterViewInit, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ILabeledValue } from '../../../../core/converter/value/value-converter.interface';
import {
  IDynamicFormControl,
  IDynamicFormItem,
  ISelectItemsPayload
} from '../../form/dynamic-form/dynamic-form-control.interface';

import { DynamicFormComponent } from '../../form/dynamic-form/dynamic-form.component';

export abstract class EntityBaseComponent<T> implements OnInit, AfterViewInit {

  @Input() mode: string;
  @Input() title: string;
  @Input() editedEntity: T;
  @Output() submit: EventEmitter<T> = new EventEmitter<T>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  extensions: IEntityBaseComponentExtension<T>[] = [];
  controls: Array<IDynamicFormItem>;

  ngOnInit(): void {
    this.controls = this.getControls();
    this.extensions.forEach((extension: IEntityBaseComponentExtension<T>) => extension.onInit());
  }

  ngAfterViewInit(): void {
    this.extensions.forEach((extension: IEntityBaseComponentExtension<T>) => extension.onAfterInit());

    this.dynamicForm.form.valueChanges.subscribe((changes) => {
      this.extensions.forEach((extension: IEntityBaseComponentExtension<T>) => extension.onChanges(changes));
    });
  }

  onSubmit(): void {
    this.submit.emit(this.toSubmittedValues(this.dynamicForm.value));
  }

  toSubmittedValues(values: T): any {
    return values;
  }

  onDisplayChange(event: boolean): void {
    if (!event) {
      this.close();
    }
  }

  onCancel(): void {
    this.close();
  }

  onSelectItems(payload: ISelectItemsPayload): void {
    this.extensions.forEach((extension: IEntityBaseComponentExtension<T>) =>
      extension.onSelectItems(payload));
  }

  private close(): void {
    this.cancel.emit();
  }

  canSubmit(): boolean {
    return this.dynamicForm.canSubmit;
  }

  protected isEditMode(): boolean {
    return 'update' === this.mode;
  }

  protected abstract getControls(): Array<IDynamicFormItem>;
}
