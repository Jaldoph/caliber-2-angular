import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BatchModalService} from "../../services/batch-modal.service";
import {ManageBatchService} from "../../../services/manage-batch.service";
import {Observable} from "rxjs";
import {Location} from "../../../domain/model/location.dto";
import {Trainer} from "../../../domain/model/trainer.dto";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-create-batch-button',
  templateUrl: './create-batch-button.component.html',
  styleUrls: ['./create-batch-button.component.css']
})
export class CreateBatchButtonComponent implements OnInit {

  private readonly skillTypes$: Observable<string[]>;
  private readonly locations$: Observable<Location[]>;
  private readonly trainers$: Observable<Trainer[]>;
  @Output('onBatchCreate') onBatchCreate$: EventEmitter<Batch> = new EventEmitter<Batch>(true);

  constructor(
    private batchModalService: BatchModalService,
    private manageBatchService: ManageBatchService
  ) {
    this.skillTypes$ = this.manageBatchService.getAllSkillTypes();
    this.locations$ = this.manageBatchService.getAllLocations();
    this.trainers$ = this.manageBatchService.getAllTrainers();
  }

  ngOnInit() {
  }

  openCreateBatchModal() {
    this.batchModalService.showCreateBatchModal(this.skillTypes$, this.locations$, this.trainers$);

    this.batchModalService.createdBatchSubject.asObservable().subscribe(
      data => {
        if (data) {
          this.onBatchCreate$.emit(data);
        }
      }
    )
  }
}