import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[app-modal]' })
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
