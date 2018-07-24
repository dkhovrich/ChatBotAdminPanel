import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GlossaryService } from './glossary.service';
import { GlossaryActions } from './glossary.actions';
import { GlossaryListResolver } from './glossary-list/glossary-list-resolver.service';
import { GlossaryListComponent } from './glossary-list/glossary-list.component';

import { FirstLetterUpperCasePipe } from '../shared/pipes/first-letter-uppercase.pipe';

@NgModule({
  declarations: [
    GlossaryListComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    GlossaryListComponent
  ],
  providers: [
    GlossaryService,
    GlossaryListResolver,
    GlossaryActions,
    FirstLetterUpperCasePipe
  ]
})
export class GlossaryModule { }
