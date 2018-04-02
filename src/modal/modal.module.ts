import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ModalDirective } from './modal.directive';
import { ModalComponent } from './modal.component';
import { ModalActions } from './modal.actions';
import { ModalComponentFactoryService } from './modal-components.factory.service';

import { GlossaryEditModalComponent } from '../glossary/glossary-edit/glossary-edit-modal.component';

@NgModule({
  declarations: [
    ModalDirective,
    ModalComponent,
    GlossaryEditModalComponent,
  ],
  imports: [SharedModule],
  exports: [
    ModalComponent
  ],
  providers: [
    ModalActions,
    ModalComponentFactoryService
  ],
  entryComponents: [GlossaryEditModalComponent]
})
export class ModalModule { }
