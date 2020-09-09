import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  trainings = ['Running', 'Walking', 'Cycling'];

  @Output()
  trainingStart = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onStartTraining() {
    this.trainingStart.emit();
  }
}
