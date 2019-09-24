import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QaService} from "../../../services/qa.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Category} from "../../../domain/model/category.dto";
import {Trainee} from "../../../domain/model/trainee.dto";
import {QcNote} from "../../../domain/model/qc-note.dto";

@Component({
  selector: 'app-quality-audit-list',
  templateUrl: './quality-audit-list.component.html',
  styleUrls: ['./quality-audit-list.component.css']
})
export class QualityAuditListComponent implements OnInit, OnChanges {

  @Input('week') week: number;
  @Input('batchId') batchId: number;

  categories$: Observable<Category[]>;
  trainees$: Observable<Trainee[]>;
  trainees: Trainee[];
  notesLoaded: boolean = false;

  private lastBatchId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private lastWeek$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private noteMap: Map<number, QcNote> = new Map<number, QcNote>();
  qcBatchNote: QcNote;
  lastQcStatus: string;

  constructor(
    private qaService: QaService
  ) { }

  ngOnInit() {
    this.categories$ = this.qaService.getActiveCategories();
    combineLatest(this.lastBatchId$.asObservable(), this.lastWeek$.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([batchId, week]) => {
        if (batchId > 0 && week > 0) {
          this.noteMap = new Map<number, QcNote>();
          this.notesLoaded = false;
          this.qcBatchNote = undefined;
          this.trainees$ = this.qaService.getTraineesByBatch(batchId);
          this.qaService.getQcTraineeNotesByBatchAndWeek(batchId, week).subscribe(
            data => {
              if (data && data.length > 0) {
                for (let note of data) {
                  this.noteMap.set(note.traineeId, note);
                  this.notesLoaded = true;
                }
              }
            }
          );
          this.qaService.getQcBatchNotesByBatchAndWeek(batchId, week).subscribe(
            data => {
              if (data) {
                this.qcBatchNote = data;
              }
            }
          )
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'week') {
        this.lastWeek$.next(change.currentValue);
      } else if (prop === 'batchId') {
        this.lastBatchId$.next(change.currentValue);
      }
    }
  }

  getQcTraineeNote(traineeId: number): QcNote {
    if (this.noteMap.has(traineeId) && this.noteMap.get(traineeId).technicalStatus !== undefined) {
      return this.noteMap.get(traineeId);
    } else {
      return {
        technicalStatus: "Undefined",
        softSkillStatus: "Undefined",
        traineeId: traineeId,
        batchId: this.batchId,
        week: this.week,
        content: "",
        type: "QC_TRAINEE",
      };
    }
  }

  getQcBatchNote(): QcNote {
    if (this.qcBatchNote) {
      return this.qcBatchNote;
    } else {
      this.qcBatchNote = {
        week: this.week,
        batchId: this.batchId,
        type: "QC_BATCH",
        technicalStatus: "Undefined",
        softSkillStatus: "Undefined",
        content: "",
      };
      return this.qcBatchNote;
    }
  }

  handleQcBatchNoteChange(qcNote: QcNote) {
    this.qcBatchNote.technicalStatus = qcNote.technicalStatus;
    this.qcBatchNote.softSkillStatus = qcNote.softSkillStatus;
    this.lastQcStatus = qcNote.technicalStatus;
  }

  handleQcStatusChange(qcNote: QcNote) {
    let currentNote: QcNote = qcNote;
    currentNote.technicalStatus = qcNote.technicalStatus;
    currentNote.softSkillStatus = qcNote.softSkillStatus;
    currentNote.content = qcNote.content;
    this.qaService.upsertQcTraineeNote(currentNote).subscribe(
      data => {
        this.noteMap.set(data.traineeId, data);
      }
    )
  }
}
