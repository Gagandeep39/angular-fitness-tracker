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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ ui: State }>
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

  isAuth() {
    return this.isAuthenticated;
  }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
