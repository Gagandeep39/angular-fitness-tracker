import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from 'src/app/common/stop-training/stop-training.component';
import { TrainingService } from 'src/app/services/training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { Exercise } from 'src/app/models/exercise';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer = null;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exer: Exercise) => {
        const step = (exer.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef
      .afterClosed()
      .subscribe((result) =>
        result
          ? this.trainingService.cancelExercise(this.progress)
          : this.startOrResumeTimer()
      );
  }
}
