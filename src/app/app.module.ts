import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseUrlInterceptor } from '../interceptors/base-url.interceptor';
import { HeadersInterceptor } from '../interceptors/headers.interceptor';
import { TokenInterceptor } from '../interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AuthLoggedOutGuard } from '../guards/auth-logged-out.guard.service';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from '../login/login.module';
import { HomeModule } from '../home/home.module';
import { ModalModule } from '../modal/modal.module';

import { AppComponent } from './app.component';
import { BaseSubscriptionComponent } from './app-base-subscription.component';

import { rootReducer, IAppState } from '../redux/store';

@NgModule({
  declarations: [
    AppComponent,
    BaseSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgReduxModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    ModalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthLoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, {}, [], storeEnhancers);
  }
}
