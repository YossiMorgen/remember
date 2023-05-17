import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './conponents/layout-area/layout/layout.component';
import { LoginComponent } from './conponents/auth-area/login/login.component';
import { RegisterComponent } from './conponents/auth-area/register/register.component';
import { HeaderComponent } from './conponents/layout-area/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
