import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [],
})
export class AuthModule {}
