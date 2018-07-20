import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { GlossaryActions } from '../glossary.actions';

import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel } from '../glossary.models';
import { NgOption } from '@ng-select/ng-select';

@Component({
  templateUrl: './glossary-add-edit-modal.component.html',
  styleUrls: ['./glossary-add-edit-modal.component.scss']
})
export class GlossaryAddEditModalComponent implements IModalComponent {
  private readonly updateTitleText: string = 'Edit glossary';
  private readonly createTitleText: string = 'Create glossary';
  private readonly updateButtonText: string = 'Update';
  private readonly createButtonText: string = 'Create';
  private readonly updateToastrSuccessMessageText: string = 'Glossary successfully updated!';
  private readonly createToastrSuccessMessageText: string = 'Glossary successfully created!';
  private readonly updateToastrErrorMessageText: string = 'Error updating glossary!';
  private readonly createToastrErrorMessageText: string = 'Error creating glossary!';

  isUpdateMode: boolean;
  data: IGlossaryModel;
  title: string;
  submitButtonText: string;
  cancelButtonText = 'Cancel';
  toastrSuccessMessageText: string;
  toastrErrorMessageText: string;
  settings: NgOption[];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private service: GlossaryService,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
    this.createForm();
  }

  init(): void {
    this.isUpdateMode = !!this.data;
    this.submitButtonText = this.isUpdateMode ? this.updateButtonText : this.createButtonText;
    this.toastrSuccessMessageText = this.isUpdateMode ? this.updateToastrSuccessMessageText : this.createToastrSuccessMessageText;
    this.toastrErrorMessageText = this.isUpdateMode ? this.updateToastrErrorMessageText : this.createToastrErrorMessageText;
    this.title = this.isUpdateMode ? this.updateTitleText : this.createTitleText;

    if (this.data) {
      const { title, text } = this.data;
      this.form.setValue({ title, text });
    }
  }

  submit(): void {
    this.isUpdateMode ? this.update() : this.create();
  }

  isSubmitAvaliable(): boolean {
    return this.form.valid;
  }

  private update(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary();

    this.service.update(model.id, model)
      .subscribe(() => {
        this.glossaryActions.update(model);
        this.toastrService.success(this.toastrSuccessMessageText, null, { closeButton: true });
        this.modalActions.hide();
      }, () => {
        this.toastrService.error(this.toastrErrorMessageText, null, { closeButton: true });
        this.modalActions.hide();
      });
  }

  private create(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary();

    this.service.create(model)
      .subscribe((item: IGlossaryModel) => {
        this.glossaryActions.create(item);
        this.toastrService.success(this.toastrSuccessMessageText, null, { closeButton: true });
        this.modalActions.hide();
      }, () => {
        this.toastrService.error(this.toastrErrorMessageText, null, { closeButton: true });
        this.modalActions.hide();
      });
  }

  private createForm(): any {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  private prepareSaveGlossary(): IGlossaryModel {
    const model = this.form.value;

    return {
      id: this.data ? this.data.id : null,
      title: model.title as string,
      text: model.text as string
    };
  }
}
