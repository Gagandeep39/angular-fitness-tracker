import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Specify columns tht should be rendered, must match names of matColumnDef
  // ID is not beign displayed as its not present here
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  // finishedExerciseSubscription: Subscription;
  // isLoading: boolean = false;
  // loadingSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.trainingService.getExerciseHistory();
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises) => (this.dataSource.data = exercises));
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
