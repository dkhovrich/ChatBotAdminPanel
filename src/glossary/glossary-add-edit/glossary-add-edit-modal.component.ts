import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgOption } from '@ng-select/ng-select';

import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { GlossaryActions } from '../glossary.actions';

import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel, GlossaryTitleModel } from '../glossary.models';
import { Language } from '../../constants';

@Component({
  templateUrl: './glossary-add-edit-modal.component.html',
  styleUrls: ['./glossary-add-edit-modal.component.scss']
})
export class GlossaryAddEditModalComponent implements IModalComponent, AfterViewInit {
  private readonly updateTitleText: string = 'Edit glossary';
  private readonly createTitleText: string = 'Create glossary';
  private readonly updateButtonText: string = 'Update';
  private readonly createButtonText: string = 'Create';
  private readonly updateToastrSuccessMessageText: string = 'Glossary successfully updated!';
  private readonly createToastrSuccessMessageText: string = 'Glossary successfully created!';
  private readonly updateToastrErrorMessageText: string = 'Error updating glossary!';
  private readonly createToastrErrorMessageText: string = 'Error creating glossary!';

  @ViewChild('description') description: ElementRef;

  language = Language;
  isUpdateMode: boolean;
  data: IGlossaryModel;
  title: string;
  submitButtonText: string;
  cancelButtonText = 'Cancel';
  toastrSuccessMessageText: string;
  toastrErrorMessageText: string;
  settings: NgOption[];
  textAreaHeight = 100;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private service: GlossaryService,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    setTimeout(this.expandTextArea.bind(this));
  }

  init(): void {
    this.isUpdateMode = !!this.data;
    this.submitButtonText = this.isUpdateMode ? this.updateButtonText : this.createButtonText;
    this.toastrSuccessMessageText = this.isUpdateMode ? this.updateToastrSuccessMessageText : this.createToastrSuccessMessageText;
    this.toastrErrorMessageText = this.isUpdateMode ? this.updateToastrErrorMessageText : this.createToastrErrorMessageText;
    this.title = this.isUpdateMode ? this.updateTitleText : this.createTitleText;

    if (this.data) {
      const { title: { rus: titleRus, eng: titleEng }, description } = this.data;
      this.form.setValue({ titleRus, titleEng, description });
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
      titleRus: '',
      titleEng: '',
      description: ['', Validators.required],
    }, {
        validator: (group: FormGroup): ValidationErrors => {
          const titleRus: string = group.controls.titleRus.value || '';
          const titleEng: string = group.controls.titleEng.value || '';

          return titleRus.length === 0 && titleEng.length === 0 ? { 'title': true } : null;
        }
      });
  }

  private prepareSaveGlossary(): IGlossaryModel {
    const model = this.form.value;

    return {
      id: this.data ? this.data.id : null,
      title: new GlossaryTitleModel(model.titleRus, model.titleEng),
      description: model.description as string
    };
  }

  private expandTextArea(): void {
    this.textAreaHeight = this.description.nativeElement.scrollHeight;
  }
}
