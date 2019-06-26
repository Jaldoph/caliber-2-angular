import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ReportsComponent } from '../reports/reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent }
];

@NgModule( {
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ReportsRoutingModule{}