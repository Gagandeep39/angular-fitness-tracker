import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining = false;

  constructor() { }

  ngOnInit(): void {
  }

}
