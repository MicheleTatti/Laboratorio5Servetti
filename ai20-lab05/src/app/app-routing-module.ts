import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './teacher/students/students.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { HomeComponent } from './home.component';
import { VmsContComponent } from './vms/vms.component';
import { StudentsContComponent } from './teacher/students-cont.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'courses',
    canActivate:[AuthGuard],
    children: [
      {
        path: 'teacher/course/applicazioni-internet/students',
        component: StudentsContComponent,
      },
      {
        path: 'teacher/course/applicazioni-internet/vms',
        component: VmsContComponent
      }
    ]

  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],

  exports: [RouterModule]
})
export class AppRoutingModule { }