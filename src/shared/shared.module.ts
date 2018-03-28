import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ArrayToStringPipe } from './pipes/array-to-string.pipe';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule
];

const pipes = [ArrayToStringPipe]

@NgModule({
  declarations: [pipes],
  imports: modules,
  exports: [...modules, ...pipes]
})
export class SharedModule { }
