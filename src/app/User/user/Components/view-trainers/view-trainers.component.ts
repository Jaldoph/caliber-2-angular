import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { EditTrainerComponent } from '../edit-trainer/edit-trainer.component';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { DisableTrainerComponent } from '../disable-trainer/disable-trainer.component';


@Component({
  selector: 'app-view-trainers',
  templateUrl: './view-trainers.component.html',
  styleUrls: ['./view-trainers.component.css']
})
export class ViewTrainersComponent implements OnInit {
  constructor(private trainerservice: TrainersService,
    private errorService: ErrorService) { }
  /**
   * The trainer bound to the disable component
   */

  @ViewChild('editTrainerModal') EditTrainer: EditTrainerComponent;

  @ViewChild('disableTrainerModal') DisableTrainer: DisableTrainerComponent;

  trainersList : Trainer[] = [];
  
  @ViewChildren('addTrainerModal') AddTrainer: AddTrainerComponent;

  ngOnInit() 
  {
    this.getAllTrainers();
  }
  /**     This method redirects to the EditTrainerComponent
   * to display the trainer's information in the modal which is
   * specified in the *ngFor loop.
   * @author Carl Pacquing
   */
  displayTrainerUpdateModal(trainer: Trainer) {
    this.EditTrainer.displayTrainer(trainer);

  }

  getAllTrainers() 
  {
    this.trainerservice.getAllTrainers().subscribe(trainers => 
      {
        this.trainersList = trainers;
      }, error => {
        const serviceName = 'User Service ';
        const errorMessage = 'Failed to make connection!';
        this.errorService.setError(serviceName, errorMessage);
      });
  }
  /**
   * This method redirects takes a trainer to the backend to be updated to the inactive role.
   */
  displayDisableTrainerModal(trainer: Trainer) {
    this.DisableTrainer.displayConfirmation(trainer);
  }

  resetAddTrainerForm()
  {
    this.AddTrainer.resetAddTrainerForm();
  }

}