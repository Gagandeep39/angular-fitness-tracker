import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  trainings$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.fetchExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainings$ = this.store.select(fromTraining.getAvailableExercises);
  }

  fetchExercises() {
    this.trainingService.getAllExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
