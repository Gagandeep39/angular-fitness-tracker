import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthData } from '../models/auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from './ui.service';

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
    private uiService: UiService
  ) {}

  registerUser(authData: AuthData) {
    this.uiService.loadStateChanged.next(true);
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.uiService.loadStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadStateChanged.next(false);
        this.uiService.showSnackbar(error, 'Okay !', 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadStateChanged.next(true);
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadStateChanged.next(false);
        console.log(result);
      })
      .catch((error) => {
        this.uiService.loadStateChanged.next(false);
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
