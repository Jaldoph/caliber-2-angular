import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class QaNotesService {

  constructor(
    private http: HttpClient
  ) {}

  upsertQcTraineeNote(qcNote: QcNote): Observable<QcNote> {
    return this.http.post<QcNote>(environment.api.qa.traineeNotes, qcNote);
  }

  upsertQcBatchNote(qcNote: QcNote): Observable<QcNote> {
    return this.http.post<QcNote>(environment.api.qa.batchNotes, qcNote);
  }

  getQcTraineeNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.http.get<QcNote[]>(environment.api.qa.qcTraineeNotesByBatchAndWeek(batchId, week));
  }

  getQcBatchNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote> {
    return this.http.get<QcNote>(environment.api.qa.qcBatchNotesByBatchAndWeek(batchId, week));
  }

  getAllQcNotesByBatch(batchId: number): Observable<QcNote[]> {
    return this.http.get<QcNote[]>(environment.api.qa.allNotesByBatch(batchId));
  }

  getOverallQcNoteByBatchAndWeek(batchId: number, week: number): Observable<QcNote> {
    return this.http.get<QcNote>(environment.api.qa.qcBatchNotesByBatchAndWeek(batchId, week));
  }

  getAllQcNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.http.get<QcNote[]>(environment.api.qa.allQcNotesByBatchAndWeek(batchId, week));
  }
}