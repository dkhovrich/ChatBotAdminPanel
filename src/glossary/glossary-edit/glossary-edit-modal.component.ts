import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GlossaryService } from '../glossary.service';

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

  constructor(private service: GlossaryService) {
    this.createForm();
  }

  init(): void {
    const { title, text, picture, link, meta: { text: metaText, link: metaLink, picture: metaPicture } } = this.data;
    this.form.setValue({ title, text, picture, link, metaText, metaLink, metaPicture })
  }

  submit(): void {
    const model: IGlossaryModel = this.prepareSaveGlossary;
    console.log(model);
  }

  isSubmitAvaliable(): boolean {
    return this.form.valid;
  }

  private createForm(): any {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      picture: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      metaText: new FormControl(false),
      metaLink: new FormControl(false),
      metaPicture: new FormControl(false)
    })
  }
}
