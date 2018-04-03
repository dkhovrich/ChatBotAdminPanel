import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { GlossaryActions } from '../glossary.actions';

import { Language } from '../../constants'
import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel, IGlossaryMetaModel } from '../glossary.models'
import { LinkRegex } from '../../constants'

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

  isUpdateMode: boolean;
  data: IGlossaryModel;
  title: string;
  submitButtonText: string;
  cancelButtonText: string = 'Cancel';
  toastrSuccessMessageText: string;

  form: FormGroup;

  private get prepareSaveGlossary(): IGlossaryModel {
    const model = this.form.value;

    const meta: IGlossaryMetaModel = {
      text: model.metaText as boolean,
      link: model.metaLink as boolean,
      picture: model.metaPicture as boolean
    };

    return {
      id: this.data ? this.data.id : null,
      title: model.title as string,
      text: model.text as string,
      picture: model.picture as string,
      link: model.link as string,
      meta: meta,
      keywords: this.data ? this.data.keywords : [],
      related_titles: this.data ? this.data.related_titles : [],
      language: Language.Russian
    }
  }

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
    this.title = this.isUpdateMode ? this.updateTitleText : this.createTitleText;

    if (this.data) {
      const { title, text, picture, link, meta: { text: metaText, link: metaLink, picture: metaPicture } } = this.data;
      this.form.setValue({ title, text, picture, link, metaText, metaLink, metaPicture })
    }
  }

  submit(): void {
    this.isUpdateMode ? this.update() : this.create();
  }

  isSubmitAvaliable(): boolean {
    return this.form.valid;
  }

  private update(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary;
    model.uid = this.data.uid;

    this.service.update(model)
      .subscribe((item: IGlossaryModel) => {
        this.glossaryActions.update(item);
        this.toastrService.success(this.toastrSuccessMessageText, null, {
          closeButton: true
        });
        this.modalActions.hide();
      });
  }

  private create(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary;

    this.service.create(model)
      .subscribe((item: IGlossaryModel) => {
        this.glossaryActions.create(item);
        this.toastrService.success(this.toastrSuccessMessageText, null, {
          closeButton: true
        });
        this.modalActions.hide();
      });
  }

  private createForm(): any {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      picture: '',
      link: '',
      metaText: false,
      metaLink: false,
      metaPicture: false
    });
  }
}
