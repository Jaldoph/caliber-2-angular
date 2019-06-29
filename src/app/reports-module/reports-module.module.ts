import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../reports/Components/reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.service';
import { ReportService } from '../reports/Service/report.service';
import { ToolbarComponent } from '../reports/Components/toolbar/toolbar.component';
import {  OverallQCScoresComponent } from '../reports/Components/overall-qc-scores/overall-qc-scores.component'

@NgModule({
  declarations: [
    ReportsComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    
  ],
  providers: [
    ReportService,
    OverallQCScoresComponent,
  ]
})
export class ReportsModule { }
