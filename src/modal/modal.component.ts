import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';

import { ModalActions } from './modal.actions';
import { ModalDirective } from './modal.directive';
import { ModalComponentFactoryService } from './modal-components.factory.service';

import { BaseSubscriptionComponent } from '../app/app-base-subscription.component';
import { IAppState } from '../redux/store';
import { ModalComponentEnum } from './modal-components.enum';
import { IModalComponent } from './modal.models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends BaseSubscriptionComponent {
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  componentType?: ModalComponentEnum;
  componentData: any;
  componentRef: ComponentRef<any>;
  componentInstance: IModalComponent;
  view: ViewContainerRef;

  submitButtonText: string;
  cancelButtonText: string;

  private get isVisible(): boolean {
    return !!this.componentType;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngRedux: NgRedux<IAppState>,
    private actions: ModalActions,
    private modalComponentFactoryService: ModalComponentFactoryService) {
    super();

    const subscription: Subscription = this.ngRedux.select(data => data.modal)
      .subscribe(data => {
        this.componentType = data.component;
        this.componentData = data.data;

        if (this.isVisible) {
          this.loadComponent();
          this.setModalData();
        }
      });
    this.addSubscription(subscription);
  }

  getClasses(): object {
    return { 'visible': this.isVisible, 'hidden': !this.isVisible };
  }

  submit(): void {
    this.componentInstance.submit();
  }

  close(): void {
    this.clear();
    this.actions.hide();
  }

  private loadComponent(): void {
    const component: Type<any> = this.modalComponentFactoryService.create(this.componentType);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    this.view = this.modalHost.viewContainerRef;
    this.view.clear();

    this.componentRef = this.view.createComponent(componentFactory);
    this.componentInstance = this.componentRef.instance as IModalComponent;
    this.componentInstance.data = this.componentData;
  }

  private setModalData(): void {
    const { submitButtonText, cancelButtonText } = this.componentInstance;
    this.submitButtonText = submitButtonText;
    this.cancelButtonText = cancelButtonText;
  }

  private clearModalData(): void {
    this.submitButtonText = null;
    this.cancelButtonText = null;
  }

  private clear(): void {
    this.clearModalData();

    this.componentType = null;
    this.componentData = null;
    this.componentInstance = null;

    this.view.clear();
    this.componentRef.destroy();
  }
}
