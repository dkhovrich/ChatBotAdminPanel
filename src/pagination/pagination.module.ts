import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule { }
