import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes = [
  // { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: '', component: TrainingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
