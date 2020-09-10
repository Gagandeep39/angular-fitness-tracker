import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  trainings: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private firestoreDb: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.trainings = this.firestoreDb
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
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
