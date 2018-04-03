import { Injectable, Type } from '@angular/core';

import { ModalComponentEnum } from './modal-components.enum';
import { GlossaryAddEditModalComponent } from '../glossary/glossary-add-edit/glossary-add-edit-modal.component';

@Injectable()
export class ModalComponentFactoryService {
  private readonly componentMap = new Map<ModalComponentEnum, Type<any>>();

  constructor() {
    this.componentMap.set(ModalComponentEnum.GlossaryAddEdit, GlossaryAddEditModalComponent);
  }

  create(component: ModalComponentEnum): Type<any> {
    return this.componentMap.get(component);
  }
}
