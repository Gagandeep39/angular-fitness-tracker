import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit {
  exerciseHistory: Exercise[] = [];
  // Specify columns tht should be rendered, must match names of matColumnDef
  // ID is not beign displayed as its not present here
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseHistory = this.trainingService.getExerciseHistory();
  }
}
