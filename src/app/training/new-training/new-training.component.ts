import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  trainings: Exercise[];
  exerciseSubcription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubcription = this.trainingService.exercisesChange.subscribe(exercises => this.trainings = exercises);
    this.trainingService.getAllExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubcription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
