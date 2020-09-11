import { Action } from '@ngrx/store';
import { Exercise } from '../models/exercise';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

// Better autocomplete support
export class SetAvailableTrainings implements Action {
  readonly type: string = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {}
}
export class SetFinishedTrainings implements Action {
  readonly type: string = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) {}
}
export class StartTraining implements Action {
  readonly type: string = START_TRAINING;
  constructor(public payload: string) {}
}
export class StopTraining implements Action {
  readonly type: string = STOP_TRAINING;
  public payload = null;
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
