import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  data: any;
  componentRef: ComponentRef<any>;
  componentInstance: IModalComponent;
  view: ViewContainerRef;
  submitted = false;

  get title(): string {
    return this.componentInstance ? this.componentInstance.title : null;
  }

  get submitButtonText(): string {
    return this.componentInstance ? this.componentInstance.submitButtonText : null;
  }

  get isSubmitAvaliable(): boolean {
    return this.componentInstance ? this.componentInstance.isSubmitAvaliable() : false;
  }

  get cancelButtonText(): string {
    return this.componentInstance ? this.componentInstance.cancelButtonText : null;
  }

  get toastrSuccessMessageText(): string {
    return this.componentInstance ? this.componentInstance.toastrSuccessMessageText : null;
  }

  get toastrErrorMessageText(): string {
    return this.componentInstance ? this.componentInstance.toastrErrorMessageText : null;
  }

  private get isVisible(): boolean {
    return !!this.componentType;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngRedux: NgRedux<IAppState>,
    private actions: ModalActions,
    private modalComponentFactoryService: ModalComponentFactoryService,
    private toastrService: ToastrService) {
    super();

    const subscription: Subscription = this.ngRedux.select(data => data.modal)
      .subscribe(data => {
        this.componentType = data.component;
        this.data = data.data;

        if (this.isVisible) {
          this.loadComponent();
        }
      });
    this.addSubscription(subscription);
  }

  getClasses(): object {
    return { 'visible': this.isVisible, 'hidden': !this.isVisible };
  }

  submit(): void {
    this.submitted = true;

    this.componentInstance.submit()
      .subscribe(() => {
        this.toastrService.success(this.toastrSuccessMessageText, null, { closeButton: true });

        this.submitted = false;
        this.actions.hide();
      }, () => {
        this.toastrService.error(this.toastrErrorMessageText, null, { closeButton: true });

        this.submitted = false;
        this.actions.hide();
      });
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
    this.componentInstance.data = this.data;
    this.componentInstance.init();
  }

  private clear(): void {
    this.componentType = null;
    this.data = null;
    this.componentInstance = null;

    this.view.clear();
    this.componentRef.destroy();
  }
}
