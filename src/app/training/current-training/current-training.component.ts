import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer = null;

  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.progress+=5;
      if(this.progress >= 100) clearInterval(this.timer)
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
  }

}
