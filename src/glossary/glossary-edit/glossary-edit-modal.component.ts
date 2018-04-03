import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { GlossaryActions } from '../glossary.actions';

import { Language } from '../../constants'
import { IModalComponent } from '../../modal/modal.models';
import { IGlossaryModel, IGlossaryMetaModel } from '../glossary.models'
import { LinkRegex } from '../../constants'

@Component({
  selector: 'app-glossary-edit',
  templateUrl: './glossary-edit-modal.component.html',
  styleUrls: ['./glossary-edit-modal.component.scss']
})
export class GlossaryEditModalComponent implements IModalComponent {
  data: IGlossaryModel;
  title: string = 'Edit glossary'
  submitButtonText: string = 'Save';
  cancelButtonText: string = 'Cancel';

  form: FormGroup;

  private get prepareSaveGlossary(): IGlossaryModel {
    const model = this.form.value;

    const meta: IGlossaryMetaModel = {
      text: model.metaText as boolean,
      link: model.metaLink as boolean,
      picture: model.metaPicture as boolean
    };

    return {
      id: this.data.id,
      title: model.title as string,
      text: model.text as string,
      picture: model.picture as string,
      link: model.link as string,
      meta: meta,
      keywords: this.data.keywords,
      related_titles: this.data.related_titles,
      language: Language.Russian
    }
  }

  constructor(
    private fb: FormBuilder,
    private service: GlossaryService,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
    this.createForm();
  }

  init(): void {
    const { title, text, picture, link, meta: { text: metaText, link: metaLink, picture: metaPicture } } = this.data;
    this.form.setValue({ title, text, picture, link, metaText, metaLink, metaPicture })
  }

  submit(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary;
    model.uid = this.data.uid;

    this.service.update(model)
      .subscribe((item: IGlossaryModel) => {
        this.glossaryActions.update(item);
        this.modalActions.hide();
      });
  }

  isSubmitAvaliable(): boolean {
    return this.form.valid;
  }

  private createForm(): any {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      picture: ['', Validators.required],
      link: ['', Validators.required],
      metaText: false,
      metaLink: false,
      metaPicture: false
    });
  }
}
