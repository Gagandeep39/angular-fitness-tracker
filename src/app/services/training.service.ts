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
  private exercises: Exercise[] = [];

  constructor() {}

  getAllExercises() {
    return [...this.availableExercise];
  }

  getExerciseHistory() {
    return this.exercises.slice();
  }

  startExercise(selectedId: string) {
    this.activeExercise = this.availableExercise.find(
      (exer) => exer.id === selectedId
    );
    this.exerciseChange.next({ ...this.activeExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.activeExercise,
      date: new Date(),
      state: 'completed',
    });
    this.activeExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.activeExercise,
      calories: this.activeExercise.calories * (progress / 100),
      duration: this.activeExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.activeExercise = null;
    this.exerciseChange.next(null);
  }

  getActiveExercise() {
    return { ...this.activeExercise };
  }
}
