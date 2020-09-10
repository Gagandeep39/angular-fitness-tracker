import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthData } from '../models/auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { UiService } from './ui.service';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';
import * as Ui from '../shared/ui.actions';
import * as auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<State>
  ) {}

  registerUser(authData: AuthData) {
    // this.uiService.loadStateChanged.next(true);
    this.store.dispatch(new Ui.StartLoading());
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        // this.uiService.loadStateChanged.next(false);
        this.store.dispatch(new Ui.StopLoading());
      })
      .catch((error) => {
        // this.uiService.loadStateChanged.next(false);
        this.store.dispatch(new Ui.StopLoading());
        this.uiService.showSnackbar(error, 'Okay !', 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new Ui.StartLoading());
    this.uiService.loadStateChanged.next(true);
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new Ui.StopLoading());
        // this.uiService.loadStateChanged.next(STOPfalse);
        console.log(result);
      })
      .catch((error) => {
        this.store.dispatch(new Ui.StopLoading());
        // this.uiService.loadStateChanged.next(false);
        this.uiService.showSnackbar(error, 'Okay !', 3000);
      });
  }

  logout() {
    this.angularFireAuth.signOut();
  }
  
  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new auth.SetAuthenticated())
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new auth.SetUnauthenticated())
        this.router.navigate(['/login']);
      }
    });
  }
}
