import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GlossaryService } from './glossary.service';
import { GlossaryActions } from './glossary.actions';
import { GlossaryListResolver } from './glossary-list/glossary-list-resolver.service';
import { GlossaryListComponent } from './glossary-list/glossary-list.component';
import { GlossaryFlagComponent } from './glossary-flag/glossary-flag.component';

import { FirstLetterUpperCasePipe } from '../shared/pipes/first-letter-uppercase.pipe';

@NgModule({
  declarations: [
    GlossaryListComponent,
    GlossaryFlagComponent
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
