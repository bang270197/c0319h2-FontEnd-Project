import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {AppRoutingModule} from './app-routing.module';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardServiceService} from './auth/auth-guard-service.service';
import {AuthGuard1ServiceService} from './auth/auth-guard1-service.service';
import {ManagerComponent} from './manager/manager.component';
import {UserServiceService} from './user/user-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [httpInterceptorProviders, AuthGuardServiceService, AuthGuard1ServiceService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
