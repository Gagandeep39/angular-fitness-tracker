import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
