import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgSelectModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule { }
