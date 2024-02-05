import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyTrackingComponent } from 'src/components/hourly-tracking/hourly-tracking.component';

const routes: Routes = [
  { path: 'hourly-tracking', component: HourlyTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
