import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private activeExercise: Exercise;
  public exerciseChange = new Subject<Exercise>();
  private availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'push-ups', name: 'Push Ups', duration: 60, calories: 20 },
  ];

  constructor() {}

  getAllExercises() {
    return [...this.availableExercise];
  }

  startExercise(selectedId: string) {
    this.activeExercise = this.availableExercise.find(
      (exer) => exer.id === selectedId
    );
    this.exerciseChange.next({...this.activeExercise});
  }
}
