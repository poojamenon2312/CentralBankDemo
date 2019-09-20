import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component'
import { BankReportsComponent } from './modules/bank-reports/bank-reports.component'
import { MasReportsComponent } from './modules/mas-reports/mas-reports.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: MainComponent },
  { path: 'bank-reports', component: BankReportsComponent },
  { path: 'mas-reports', component: MasReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }