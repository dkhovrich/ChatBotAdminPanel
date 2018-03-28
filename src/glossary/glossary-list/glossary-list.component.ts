import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux, Selector } from '@angular-redux/store';
import { Subscription } from 'rxjs';

import { BaseSubscriptionComponent } from '../../app/app-base-subscription.component';
import { GlossaryActions } from '../glossary.actions';
import { IAppState } from '../../redux/store';
import { IGlossaryModel } from '../glossary.models';

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
    private actions: GlossaryActions) {
    super();

    const subscription: Subscription = ngRedux.select(data => data.glossary).subscribe(data => this.glossaries = data.items);
    this.addSubscription(subscription);
  }

  ngOnInit(): void {
    this.route.data.subscribe(res => this.actions.load(res.data));
  }
}
