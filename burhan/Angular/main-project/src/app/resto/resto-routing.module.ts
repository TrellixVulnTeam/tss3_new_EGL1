import { NgModule, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RestoComponent } from './resto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BackdoorGuard } from './guard/backdoor.guard';


const routes: Routes = [
  {
    path : "",
    component : RestoComponent,
    children : [
      {
        path : "login",
        component : LoginComponent
      },
      {
        path : "signup",
        component : SignupComponent
      },
      {
        path : "dashboard",
        component : DashboardComponent,
        canActivate : [BackdoorGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoRoutingModule { }
