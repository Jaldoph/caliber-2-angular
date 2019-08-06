import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})

export class EditTrainerComponent implements OnInit{

  //Trainer passed from View Trainers Component.
  @Input() trainerToEdit : Trainer;

  //Used to store the original trainer fields.
  originalTrainer = new Trainer();
  //Used to store the new trainer inputs.
  trainer:Trainer;

  constructor(private trService: TrainersService, private errorService: ErrorService) { }

  ngOnInit() 
  {
    
  }
  /** 
   *      This method displays the trainer information in the modal to be edited. 
   * We store the trainerObj parameter into an originalTrainer variable, and set the "trainer" variable, 
   * which is two-way bound in the edit-trainer view, to the trainerObj parameter.
   * In order to remove two-way data-binding referencing, we converted "trainer" into a JSON.
   * Thus, we are able to distinguish between the original trainer, and the new trainer object. 
   * @author Carl Pacquing
  */
  displayTrainer(trainerObj:Trainer)
  { //A setter method to set our initial Trainer information.
    //Display the information in the modal.
    console.log(trainerObj);
    this.originalTrainer = trainerObj;//Store original trainer to the trainerObj parameter.    
    this.trainer = JSON.parse(JSON.stringify(trainerObj)); // actual trainer data;
    console.log(this.originalTrainer);
  }

/**Updates the trainer's information when the "Update" button is clicked.
 * When a valid request is sent, the trainer's information gets updated,
 * and the page reloads to display the changes.
 * @author Carl Pacquing
 */

  updateTrainerToEdit(){
        //Update the trainer
       // this.trainerToEdit = this.originalTrainer;
        console.log("Updating trainer");
        console.log("Original trainer: ", this.originalTrainer);
        console.log("New Trainer: ", this.trainer);

        this.trService.editTrainer(this.trainer).subscribe(response => {
          window.location.reload();
        },
        issue => {

          console.log("Issue", issue);
          if (issue instanceof HttpErrorResponse) {
            const serviceName = 'User Service';
            this.errorService.setError(serviceName, issue.error.message);
          }
      });
  }


  closeTrainer(){
    //This function should close the modal, and omit any changes made in the modal.
    //I.e. The trainer information should remain unchanged.
    console.log("Revert to original fields.");
    console.log("Original Trainer:",this.originalTrainer);
    console.log("Before Cancellation:", this.trainer);
    this.trainer = this.originalTrainer;
    console.log("After Revert:", this.trainer);
  }
}



