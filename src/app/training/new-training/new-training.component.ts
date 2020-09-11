import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // trainings: Exercise[];
  // exerciseSubcription: Subscription;
  isLoading$: Observable<boolean>;
  trainings$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    // this.exerciseSubcription = this.trainingService.exercisesChange.subscribe(
    //   (exercises) => (this.trainings = exercises)
    // );
    this.fetchExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainings$ = this.store.select(fromTraining.getAvailableExercises);
  }

  fetchExercises() {
    this.trainingService.getAllExercises();
  }

  ngOnDestroy(): void {
    // this.exerciseSubcription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
