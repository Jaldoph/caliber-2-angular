import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../types/trainer';
import { TrainersService } from '../../Services/trainers.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  constructor(private trainerServ:TrainersService, private errorService:ErrorService) { }

  ngOnInit() {
  }

  private newTrainer:Trainer = new Trainer();
  
  addTrainer()
  {
    this.trainerServ.addTrainer(this.newTrainer).subscribe(response => 
    {
      alert("Trainer added successfully!");
    }, error => {
      const serviceName = 'User Service ';
      const errorMessage = 'Failed to add trainer to database!';
      this.errorService.setError(serviceName, errorMessage);
    });

  }

  closeAddTrainerModal()
  {
    this.resetAddTrainerForm();

  }

  resetAddTrainerForm() 
  {
    if (this.newTrainer === undefined)
    {
      return;
    }
      
    this.newTrainer.trainerId = undefined;
    this.newTrainer.name = "";
    this.newTrainer.title = "";
    this.newTrainer.email = "";
    this.newTrainer.tier = "";
    this.newTrainer.password = "";

  }
  
}