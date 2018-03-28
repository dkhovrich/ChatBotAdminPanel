import { Injectable, Type } from '@angular/core';

import { ModalComponentEnum } from './modal-components.enum';
import { GlossaryEditModalComponent } from '../glossary/glossary-edit/glossary-edit-modal.component';

@Injectable()
export class ModalComponentFactoryService {
  private readonly componentMap = new Map<ModalComponentEnum, Type<any>>();

  constructor() {
    this.componentMap.set(ModalComponentEnum.GlossaryEdit, GlossaryEditModalComponent);
  }

  create(component: ModalComponentEnum): Type<any> {
    return this.componentMap.get(component);
  }
}
