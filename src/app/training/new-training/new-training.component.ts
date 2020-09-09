import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  trainings: Exercise[] = [];

  @Output()
  trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainings = this.trainingService.getAllExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
