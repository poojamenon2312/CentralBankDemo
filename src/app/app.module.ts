import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './modules/main/main.component';
import { BankReportsComponent } from './modules/bank-reports/bank-reports.component';
import { MasReportsComponent } from './modules/mas-reports/mas-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BankReportsComponent,
    MasReportsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
