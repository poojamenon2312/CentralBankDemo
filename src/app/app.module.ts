// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// App modules
import { MainComponent } from './modules/main/main.component';
import { BankReportsComponent } from './modules/bank-reports/bank-reports.component';
import { MasReportsComponent } from './modules/mas-reports/mas-reports.component';
import { HeaderComponent } from './components/header/header.component';
import { Header2Component } from './components/header2/header.component';

// External
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BankReportsComponent,
    MasReportsComponent,
    HeaderComponent,
    Header2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BlockUIModule.forRoot({
      message: 'Loading, please wait...'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
