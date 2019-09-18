import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssessBatchConatinerComponent} from './components/assess-batch-conatiner/assess-batch-conatiner.component';
import {AssessBatchV2RoutingModule} from './assess-batch-v2-routing.module';
import {CreateAssessmentButtonComponent} from './components/create-assessment-button/create-assessment-button.component';
import {ImportGradesButtonComponent} from './components/import-grades-button/import-grades-button.component';
import {AssessAssociateListComponent} from './components/assess-associate-list/assess-associate-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssessmentDetailsColumnComponent} from './components/assessment-details-column/assessment-details-column.component';
import {AssessmentDetailsRowComponent} from './components/assessment-details-row/assessment-details-row.component';
import {MockSaveComponent} from "../Assess-Batch/Components/mock-save/mock-save.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AssessBatchConatinerComponent,
    CreateAssessmentButtonComponent,
    ImportGradesButtonComponent,
    AssessAssociateListComponent,
    AssessmentDetailsColumnComponent,
    AssessmentDetailsRowComponent,
    MockSaveComponent,
  ],
  imports: [
    CommonModule,
    AssessBatchV2RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [MockSaveComponent]
})
export class AssessBatchV2Module {
}