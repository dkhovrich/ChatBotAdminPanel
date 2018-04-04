import { Injectable, Type } from '@angular/core';

import { ModalComponentEnum } from './modal-components.enum';
import { GlossaryAddEditModalComponent } from '../glossary/glossary-add-edit/glossary-add-edit-modal.component';
import { GlossaryRemoveConfirmationModalComponent } from '../glossary/glossary-remove/glossary-remove-confirmation.component';

@Injectable()
export class ModalComponentFactoryService {
  private readonly componentMap = new Map<ModalComponentEnum, Type<any>>();

  constructor() {
    this.componentMap.set(ModalComponentEnum.GlossaryAddEdit, GlossaryAddEditModalComponent);
    this.componentMap.set(ModalComponentEnum.GlossaryRemove, GlossaryRemoveConfirmationModalComponent);
  }

  create(component: ModalComponentEnum): Type<any> {
    return this.componentMap.get(component);
  }
}
