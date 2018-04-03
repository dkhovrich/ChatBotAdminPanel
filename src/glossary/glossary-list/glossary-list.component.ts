import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, Selector } from '@angular-redux/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'

import { BaseSubscriptionComponent } from '../../app/app-base-subscription.component';
import { GlossaryActions } from '../glossary.actions';
import { ModalActions } from '../../modal/modal.actions';
import { IAppState } from '../../redux/store';
import { IGlossary } from '../../redux/reducers/glossaryReducer';
import { IGlossaryModel } from '../glossary.models';
import { ModalComponentEnum } from '../../modal/modal-components.enum';

@Component({
  selector: 'app-glossary-list',
  templateUrl: './glossary-list.component.html',
  styleUrls: ['./glossary-list.component.scss']
})
export class GlossaryListComponent extends BaseSubscriptionComponent implements OnInit {
  glossaries: IGlossaryModel[];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private route: ActivatedRoute,
    private glossaryActions: GlossaryActions,
    private modalActions: ModalActions) {
    super();

    const subscription: Subscription = ngRedux.select(data => data.glossary)
      .pipe(filter((data: IGlossary) => data && !!data.items))
      .subscribe((data: IGlossary) => this.glossaries = data.items);

    this.addSubscription(subscription);
  }

  ngOnInit(): void {
    this.route.data.subscribe(res => this.glossaryActions.load(res.data));
  }

  create(): void {
    this.modalActions.show(ModalComponentEnum.GlossaryAddEdit);
  }

  update(glossary: IGlossaryModel): void {
    this.modalActions.show(ModalComponentEnum.GlossaryAddEdit, glossary);
  }
}
