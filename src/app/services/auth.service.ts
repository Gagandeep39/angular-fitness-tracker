import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthData } from '../models/auth-data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {}

  registerUser(authData: AuthData) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
      })
      .catch((error) => console.log(error));
  }

  login(authData: AuthData) {
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      })
      .catch((error) => console.log(error));
  }

  logout() {
    this.isAuthenticated = true;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
