import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'training',
    // Causes Material modules errors
    // loadChildren: './training/training.module#TrainingModule',
    canLoad: [AuthGuard],
    // OR
    loadChildren: ()=>import('./training/training.module').then(module => module.TrainingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // Guards Can be provided in app.module or in router module
  // Not required when using @Injectable({proidedIn: root})
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
