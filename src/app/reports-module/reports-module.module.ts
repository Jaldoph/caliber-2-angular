import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
 
@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
