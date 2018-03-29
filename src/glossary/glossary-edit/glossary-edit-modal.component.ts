import { Component, OnInit, Input } from '@angular/core';

import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel } from '../glossary.models'

@Component({
  selector: 'app-glossary-edit',
  templateUrl: './glossary-edit-modal.component.html'
})
export class GlossaryEditModalComponent implements IModalComponent {
  @Input() data: IGlossaryModel;

  submitButtonText: string = 'Save!';
  cancelButtonText: string = 'Cancel!';

  submit(): void {
  }
}
