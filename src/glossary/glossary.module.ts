import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GlossaryService } from './glossary.service';
import { GlossaryActions } from './glossary.actions';
import { GlossaryListResolver } from './glossary-list/glossary-list-resolver.service';
import { GlossaryListComponent } from './glossary-list/glossary-list.component';
import { GlossaryFlagComponent } from './glossary-flag/glossary-flag.component'

import { GlossaryMetaPipe } from './glossary-list/glossary-meta.pipe';

@NgModule({
  declarations: [
    GlossaryMetaPipe,
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
    GlossaryActions
  ]
})
export class GlossaryModule { }
