import { Component, OnInit, OnDestroy } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
import { AssessBatchService } from 'src/app/Assess-Batch/Services/assess-batch.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-assess-batch-conatiner',
  templateUrl: './assess-batch-conatiner.component.html',
  styleUrls: ['./assess-batch-conatiner.component.css']
})
export class AssessBatchConatinerComponent implements OnInit, OnDestroy {

  years: number[];
  readonly quarters: number[] = [1, 2, 3, 4];
  batches: Observable<Batch[]>;
  selectedYear: number;
  selectedQuarter: number;
  selectedBatch: Batch;
  selectedWeek: number;

  private yearSubject: BehaviorSubject<number>;
  private quarterSubject: BehaviorSubject<number>;

  private allBatchesThisYearAndQuarterSubscription: Subscription;

  constructor(
    private noteService: NoteService,
    private assessBatchService: AssessBatchService,
  ) {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedQuarter = this.getQuarterFromDate(date);
    this.yearSubject = new BehaviorSubject(this.selectedYear);
    this.quarterSubject = new BehaviorSubject(this.selectedQuarter);
  }

  ngOnInit() {
    this.assessBatchService.getAllYears().subscribe(
      data => {
        this.years = data;
      }, err => {
        alert("Ya done goofed. Check the logs");
        console.log(err);
      }
    );

    combineLatest(this.yearSubject.asObservable(), this.quarterSubject.asObservable()).pipe(distinctUntilChanged()).subscribe(
      ([year, quarter]) => {
        this.batches = this.assessBatchService.getBatchesByYearAndQuarter(year, quarter);

        this.allBatchesThisYearAndQuarterSubscription = this.batches.subscribe(
          batches => {
            // Never select a batch on batch load
            this.selectedBatch = undefined;
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.allBatchesThisYearAndQuarterSubscription.unsubscribe();
  }

  setSelectedQuarter(quarter: number) {
    this.selectedQuarter = quarter;
    this.quarterSubject.next(quarter);
  }

  setSelectedYear(year: number) {
    this.selectedYear = year;
    this.yearSubject.next(year);
  }

  setSelectedBatch(batch: Batch) {
    this.selectedBatch = batch;
  }

  setSelectedWeek(week: number) {
    this.selectedWeek = week;
  }

  private getQuarterFromDate(date: Date): number {
    const month = date.getMonth();
    if (month >= 0 && month < 3) {
      return 1;
    } else if (month >=3 && month < 6) {
      return 2;
    } else if (month >= 6 && month < 9) {
      return 3;
    } else if (month >= 9 && month < 12) {
      return 4;
    }
  }

}