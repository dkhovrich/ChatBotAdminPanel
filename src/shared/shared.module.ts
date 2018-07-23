import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { FlagComponent } from './flag/flag.component';
import { FirstLetterUpperCasePipe } from './pipes/first-letter-uppercase.pipe';

const components = [FlagComponent];

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
  declarations: [...components, ...pipes],
  imports: [...modules],
  exports: [...modules, ...components, ...pipes]
})
export class SharedModule { }
