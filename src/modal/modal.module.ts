import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalDirective } from './modal.directive';
import { ModalComponent } from './modal.component';
import { ModalActions } from './modal.actions';
import { ModalComponentFactoryService } from './modal-components.factory.service';

import { GlossaryAddEditModalComponent } from '../glossary/glossary-add-edit/glossary-add-edit-modal.component';
import { GlossaryRemoveConfirmationModalComponent } from '../glossary/glossary-remove/glossary-remove-confirmation.component';

const modalComponents = [
  GlossaryAddEditModalComponent,
  GlossaryRemoveConfirmationModalComponent
];

@NgModule({
  declarations: [
    ModalDirective,
    ModalComponent,
    ...modalComponents
  ],
  imports: [SharedModule],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalActions,
    ModalComponentFactoryService
  ],
  entryComponents: modalComponents
})
export class ModalModule { }
