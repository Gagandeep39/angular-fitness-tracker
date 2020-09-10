import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../guards/auth.guard';

const routes = [
  { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
