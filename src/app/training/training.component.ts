import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(
      (newExercise) =>
        newExercise
          ? (this.ongoingTraining = true)
          : (this.ongoingTraining = false)
    );
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
