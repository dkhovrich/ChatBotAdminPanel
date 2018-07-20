import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { GlossaryActions } from '../glossary.actions';

import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel } from '../glossary.models';

@Component({
  templateUrl: './glossary-remove-confirmation.component.html',
  styleUrls: ['./glossary-remove-confirmation.component.scss']
})
export class GlossaryRemoveConfirmationModalComponent implements IModalComponent {
  data: IGlossaryModel;
  title: string;
  submitButtonText: string;
  cancelButtonText: string;
  toastrSuccessMessageText: string;

  constructor(
    private toastrService: ToastrService,
    private service: GlossaryService,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
  }

  init(): void {
    this.title = 'Remove glossary';
    this.submitButtonText = 'Remove';
    this.cancelButtonText = 'Cancel';
    this.toastrSuccessMessageText = 'Glossary successfully removed!';
  }

  submit(): void {
    this.service.remove(this.data.id)
      .subscribe(() => {
        this.glossaryActions.remove(this.data);
        this.toastrService.success(this.toastrSuccessMessageText, null, {
          closeButton: true
        });
        this.modalActions.hide();
      });
  }

  isSubmitAvaliable(): boolean {
    return true;
  }
}
