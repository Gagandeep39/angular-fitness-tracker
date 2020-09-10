import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private activeExercise: Exercise;
  public exerciseChange = new Subject<Exercise>();
  public exercisesChange = new Subject<Exercise[]>();
  private availableExercise: Exercise[] = [];
  //   private availableExercise: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  //   { id: 'push-ups', name: 'Push Ups', duration: 60, calories: 20 },
  // ];
  private exercises: Exercise[] = [];
  constructor(private firestoreDb: AngularFirestore) { }

  getAllExercises() {
    this.firestoreDb
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return <Exercise[]>docArray.map((doc) => {
            const otherData: Object = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              ...otherData,
            };
          });
        })
      )
      .subscribe((exercises) => {
        this.availableExercise = exercises;
        this.exercisesChange.next([...this.availableExercise]);
      });
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
