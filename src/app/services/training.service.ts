import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private activeExercise: Exercise;
  public exerciseChange = new Subject<Exercise>();
  public exercisesChange = new Subject<Exercise[]>();
  public finishedExerciseChange = new Subject<Exercise[]>();
  private availableExercise: Exercise[] = [];
  private exerciseHistorySubs: Subscription = null;
  private allExerciseSubs: Subscription = null;
  private allSubscription: Subscription[] = [];
  //   private availableExercise: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  //   { id: 'push-ups', name: 'Push Ups', duration: 60, calories: 20 },
  // ];
  constructor(
    private firestoreDb: AngularFirestore,
    private uiService: UiService
  ) {}

  getAllExercises() {
    this.uiService.loadStateChanged.next(true);
    this.allExerciseSubs = this.firestoreDb
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
      .subscribe(
        (exercises) => {
          this.availableExercise = exercises;
          this.exercisesChange.next([...this.availableExercise]);
          this.uiService.loadStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackbar(
            'Something went wrong, try again later',
            'Okay !',
            3000
          );
          this.uiService.loadStateChanged.next(false);
        }
      );
    this.allSubscription.push(this.allExerciseSubs);
  }

  getExerciseHistory() {
    this.uiService.loadStateChanged.next(true);
    // Here we dnt need ID sowe can just fetch other data
    this.exerciseHistorySubs = this.firestoreDb
      .collection('completedExercise')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.finishedExerciseChange.next(exercises);
          this.uiService.loadStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackbar(
            'Something went wrong, try again later',
            'Okay !',
            3000
          );
          this.uiService.loadStateChanged.next(false);
        }
      );
    this.allSubscription.push(this.exerciseHistorySubs);
  }

  startExercise(selectedId: string) {
    this.activeExercise = this.availableExercise.find(
      (exer) => exer.id === selectedId
    );
    this.exerciseChange.next({ ...this.activeExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.activeExercise,
      date: new Date(),
      state: 'completed',
    });
    this.activeExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
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

  // Required to prevent errors afteer logout as the subscriptions keep on running
  cancelSubscriptions() {
    this.allSubscription.forEach((subs) => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestoreDb.collection('completedExercise').add(exercise);
  }
}
