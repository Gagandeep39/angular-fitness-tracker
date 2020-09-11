import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/exercise';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, Observable } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
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
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    // this.finishedExerciseSubscription = this.trainingService.finishedExerciseChange.subscribe(
    //   (exercises) => (this.dataSource.data = exercises)
    // );
    this.trainingService.getExerciseHistory();
    // this.loadingSubscription = this.uiService.loadStateChanged.subscribe(
    //   (loadState) => (this.isLoading = loadState)
    // );
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises) => (this.dataSource.data = exercises));
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // this.finishedExerciseSubscription.unsubscribe();
    // this.loadingSubscription.unsubscribe();
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
