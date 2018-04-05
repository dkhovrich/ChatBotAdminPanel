import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { FirstLetterUpperCasePipe } from './pipes/first-letter-uppercase.pipe';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgSelectModule
];

const pipes = [
  FirstLetterUpperCasePipe
];

@NgModule({
  declarations: pipes,
  imports: [...modules],
  exports: [...modules, ...pipes]
})
export class SharedModule { }
