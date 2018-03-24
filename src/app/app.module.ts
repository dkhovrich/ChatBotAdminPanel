import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { REDUX_STORE } from '../constants/tokents';
import createStore from '../redux/createStore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: REDUX_STORE, useFactory: createStore }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
