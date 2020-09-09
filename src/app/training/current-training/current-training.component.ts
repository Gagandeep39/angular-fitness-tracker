import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from 'src/app/common/stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()
  trainingExit = new EventEmitter();

  progress = 0;
  timer = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress+=5;
      if(this.progress >= 100) clearInterval(this.timer)
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});
    dialogRef.afterClosed().subscribe(result => result ? this.trainingExit.emit() : this.startOrResumeTimer())
  }

}
