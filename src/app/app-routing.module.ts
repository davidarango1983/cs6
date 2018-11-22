import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectedsComponent } from './rejecteds/rejecteds.component';
import { ErrorsComponent } from './errors/errors.component';
import {ResumeTableComponent} from "./resume-table/resume-table.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'csAdmin', component: HomeComponent, children : [
    { path: 'resume', component: ResumeTableComponent},
    { path: 'errors', component: ErrorsComponent, canActivate: [AuthGuard] },
    { path: 'rejecteds', component: RejectedsComponent, canActivate: [AuthGuard] },

  ]},
  
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}


