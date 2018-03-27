import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { GlossaryListComponent } from './glossary-list/glossary-list.component';

@NgModule({
  declarations: [
    GlossaryListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    GlossaryListComponent
  ]
})
export class GlossaryModule { }
