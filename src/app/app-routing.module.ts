import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BbbComponent } from './components/bbb/bbb.component';
import { AdministrationComponent } from './routes/administration/administration.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { MeetingsComponent } from './routes/meetings/meetings.component';
import { NotfoundComponent } from './routes/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bbb', component: BbbComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
