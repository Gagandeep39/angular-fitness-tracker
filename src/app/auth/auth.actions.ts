import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// Better autocomplete support
export class SetAuthenticated implements Action {
  readonly type: string = SET_AUTHENTICATED;
}
export class SetUnauthenticated implements Action {
  readonly type: string = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
