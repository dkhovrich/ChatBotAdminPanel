import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { CounterActions } from './app.actions';
import { IAppState } from "../redux/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  count$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: CounterActions) {
      this.count$ = this.ngRedux.select(state => state.bar.count);
  }

  increment(): void {
    this.actions.increment();
  }

  decrement(): void {
    this.actions.decrement();
  }
}
