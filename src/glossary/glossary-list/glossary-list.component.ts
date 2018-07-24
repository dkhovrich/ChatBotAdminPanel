import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { NgRedux, Selector } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

import { BaseSubscriptionComponent } from '../../app/app-base-subscription.component';
import { GlossaryActions } from '../glossary.actions';
import { GlossaryService } from '../glossary.service';
import { ModalActions } from '../../modal/modal.actions';
import { IAppState } from '../../redux/store';
import { IGlossary } from '../../redux/reducers/glossaryReducer';
import { IGlossaryModel, GlossaryRequest } from '../glossary.models';
import { ModalComponentEnum } from '../../modal/modal-components.enum';
import { Language } from '../../constants';

@Component({
  selector: 'app-glossary-list',
  templateUrl: './glossary-list.component.html',
  styleUrls: ['./glossary-list.component.scss']
})
export class GlossaryListComponent extends BaseSubscriptionComponent implements OnInit {
  language = Language;
  glossaries: IGlossaryModel[];
  searchForm: FormGroup;
  searchCriteriaControl: AbstractControl;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private glossaryService: GlossaryService,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
    super();

    this.createSearchForm();

    const subscription: Subscription = ngRedux.select(data => data.glossary)
      .pipe(filter((data: IGlossary) => data && !!data.items))
      .subscribe((data: IGlossary) => this.glossaries = data.items);

    this.addSubscription(subscription);
  }

  ngOnInit(): void {
    this.route.data.subscribe(res => this.glossaryActions.save(res.data));
  }

  create(): void {
    this.modalActions.show(ModalComponentEnum.GlossaryAddEdit);
  }

  update(glossary: IGlossaryModel): void {
    this.modalActions.show(ModalComponentEnum.GlossaryAddEdit, glossary);
  }

  remove(glossary: IGlossaryModel): void {
    this.modalActions.show(ModalComponentEnum.GlossaryRemove, glossary);
  }

  isClearSearchButtonVisible(): boolean {
    return this.searchCriteriaControl.value && this.searchCriteriaControl.value.length !== 0;
  }

  clearSearch(): void {
    this.searchCriteriaControl.setValue('');
  }

  private createSearchForm(): void {
    this.searchForm = this.fb.group({
      searchCriteria: ''
    });
    this.searchCriteriaControl = this.searchForm.get('searchCriteria');

    this.searchCriteriaControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        const request = new GlossaryRequest(value);
        this.glossaryService.get(request)
          .subscribe(data => this.glossaryActions.save(data));
      });
  }
}
