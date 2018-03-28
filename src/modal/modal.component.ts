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
  component?: ModalComponentEnum;
  data: any;
  view: ViewContainerRef;
  @ViewChild(ModalDirective) modalHost: ModalDirective;

  private get isVisible(): boolean {
    return !!this.component;
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngRedux: NgRedux<IAppState>,
    private actions: ModalActions,
    private modalComponentFactoryService: ModalComponentFactoryService) {
    super();

    const subscription: Subscription = this.ngRedux.select(data => data.modal)
      .subscribe(data => {
        this.component = data.component;
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

  close(): void {
    this.clear();
    this.actions.hide();
  }

  private loadComponent(): void {
    const component: Type<any> = this.modalComponentFactoryService.create(this.component);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    this.view = this.modalHost.viewContainerRef;
    this.view.clear();

    const componentRef = this.view.createComponent(componentFactory);
    (<IModalComponent>componentRef.instance).data = this.data;
  }

  private clear(): void {
    if (this.view) {
      this.view.clear();
    }

    this.component = null;
    this.data = null;
  }
}
