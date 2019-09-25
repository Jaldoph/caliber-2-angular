import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal";
import { AssessmentDialogComponent } from './components/assessment-dialog/assessment-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AssessmentResultSpinnerComponent } from './components/assessment-result-spinner/assessment-result-spinner.component';
import { AssociateFlagDialogComponent } from './components/associate-flag-dialog/associate-flag-dialog.component';
import { FlagComponent } from './components/flag/flag.component';
import { ImportGradesDialogComponent } from './components/import-grades-dialog/import-grades-dialog.component';
import {BatchSelectToolbarComponent} from "./components/batch-select-toolbar/batch-select-toolbar.component";
import {SharedDropdownMenuComponent} from "./components/shared-dropdown-menu/shared-dropdown-menu.component";
import {WeekSelectorComponent} from "./components/week-selector/week-selector.component";
import {AssociateDetailsComponent} from "./components/associate-details/associate-details.component";
import {CommentDialogService} from "./services/comment-dialog.service";
import {AssessmentDialogService} from "./services/assessment-dialog.service";
import {ImportGradesDialogService} from "./services/import-grades-dialog.service";
import {AssociateNotesComponent} from "./components/associate-notes/associate-notes.component";
import {BatchLevelFeedbackComponent} from "./components/batch-level-feedback/batch-level-feedback.component";
import { BatchSearchComponent } from './components/batch-search/batch-search.component';
import { BatchSelectDropdownComponent } from './components/batch-select-dropdown/batch-select-dropdown.component';
import {TooltipModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    AssessmentDialogComponent,
    AssessmentResultSpinnerComponent,
    AssociateFlagDialogComponent,
    FlagComponent,
    ImportGradesDialogComponent,
    BatchSelectToolbarComponent,
    SharedDropdownMenuComponent,
    WeekSelectorComponent,
    AssociateDetailsComponent,
    AssociateNotesComponent,
    BatchLevelFeedbackComponent,
    BatchSearchComponent,
    BatchSelectDropdownComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  exports: [
    ModalModule,
    AssessmentResultSpinnerComponent,
    FlagComponent,
    BatchSelectToolbarComponent,
    SharedDropdownMenuComponent,
    WeekSelectorComponent,
    AssociateDetailsComponent,
    AssociateNotesComponent,
    BatchLevelFeedbackComponent
  ],
  entryComponents: [
    AssessmentDialogComponent,
    AssociateFlagDialogComponent,
    ImportGradesDialogComponent,
  ],
  providers: [
    CommentDialogService,
    AssessmentDialogService,
    ImportGradesDialogService
  ]
})
export class SharedModule { }
