import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GlossaryService } from '../glossary.service';
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
  toastrErrorMessageText: string;
  glossaryTitle: string;

  constructor(
    private service: GlossaryService,
    private glossaryActions: GlossaryActions) {
  }

  init(): void {
    this.title = 'Remove glossary';
    this.submitButtonText = 'Remove';
    this.cancelButtonText = 'Cancel';
    this.toastrSuccessMessageText = 'Glossary successfully removed!';
    this.toastrErrorMessageText = 'Error removing glossary!';
    this.glossaryTitle = this.getGlossaryTitle();
  }

  submit(): Observable<any> {
    return this.service.remove(this.data.id)
      .pipe(
        tap(() => this.glossaryActions.remove(this.data))
      );
  }

  isSubmitAvaliable(): boolean {
    return true;
  }

  private getGlossaryTitle(): string {
    const isExists = str => typeof str === 'string' && str.length !== 0;
    const { rus, eng } = this.data.title;

    if (isExists(rus) && isExists(eng)) {
      return `${rus} / ${eng}`;
    } else if (isExists(rus)) {
      return rus;
    } else if (isExists(eng)) {
      return eng;
    }
  }
}
