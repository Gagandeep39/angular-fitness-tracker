import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainings: Exercise[];
  exerciseSubcription: Subscription;
  isLoading: boolean = false;
  loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.exerciseSubcription = this.trainingService.exercisesChange.subscribe(
      (exercises) => (this.trainings = exercises)
    );
    this.trainingService.getAllExercises();
    this.loadingSubscription = this.uiService.loadStateChanged.subscribe(
      (loadState) => (this.isLoading = loadState)
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubcription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
