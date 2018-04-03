import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalDirective } from './modal.directive';
import { ModalComponent } from './modal.component';
import { ModalActions } from './modal.actions';
import { ModalComponentFactoryService } from './modal-components.factory.service';

import { GlossaryAddEditModalComponent } from '../glossary/glossary-add-edit/glossary-add-edit-modal.component';

@NgModule({
  declarations: [
    ModalDirective,
    ModalComponent,
    GlossaryAddEditModalComponent,
  ],
  imports: [SharedModule],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalActions,
    ModalComponentFactoryService
  ],
  entryComponents: [GlossaryAddEditModalComponent]
})
export class ModalModule { }
