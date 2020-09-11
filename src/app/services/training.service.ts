import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UiService } from './ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as Ui from '../shared/ui.actions';
import * as training from '../training/training.actions';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private exerciseHistorySubs: Subscription = null;
  private allExerciseSubs: Subscription = null;
  private allSubscription: Subscription[] = [];
  constructor(
    private firestoreDb: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  getAllExercises() {
    this.store.dispatch(new Ui.StartLoading());
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
          this.store.dispatch(new training.SetAvailableTrainings(exercises));
          this.store.dispatch(new Ui.StopLoading());
        },
        (error) => {
          this.uiService.showSnackbar(
            'Something went wrong, try again later',
            'Okay !',
            3000
          );
          this.store.dispatch(new Ui.StopLoading());
        }
      );
    this.allSubscription.push(this.allExerciseSubs);
  }

  getExerciseHistory() {
    this.store.dispatch(new Ui.StartLoading());
    // Here we dnt need ID sowe can just fetch other data
    this.exerciseHistorySubs = this.firestoreDb
      .collection('completedExercise')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.store.dispatch(new training.SetFinishedTrainings(exercises));
          this.store.dispatch(new Ui.StopLoading());
        },
        (error) => {
          this.uiService.showSnackbar(
            'Something went wrong, try again later',
            'Okay !',
            3000
          );
          this.store.dispatch(new Ui.StopLoading());
        }
      );
    this.allSubscription.push(this.exerciseHistorySubs);
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exec) => {
        this.addDataToDatabase({
          ...exec,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exec) => {
        this.addDataToDatabase({
          ...exec,
          calories: exec.calories * (progress / 100),
          duration: exec.duration * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(new training.StopTraining());
      });
  }

  // Required to prevent errors afteer logout as the subscriptions keep on running
  cancelSubscriptions() {
    this.allSubscription.forEach((subs) => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestoreDb.collection('completedExercise').add(exercise);
  }
}
