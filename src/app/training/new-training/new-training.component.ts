import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  trainings: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainings = this.trainingService.getAllExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }
}
