import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.css']
})
export class StopTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit(): void {
  }

}
