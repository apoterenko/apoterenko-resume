import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOffClick]'
})
export class OffClickDirective {

  @Input() public appOffClick: any;

  constructor() {
  }

  @HostListener('click', ['$event'])
  public onClick($event: MouseEvent): void {
    $event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick($event: MouseEvent): void {
    this.appOffClick();
  }
}
