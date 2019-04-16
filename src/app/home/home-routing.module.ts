import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedHomeModule } from './shared-home/shared-home.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputDashboardComponent } from './input-dashboard/input-dashboard.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'input-dashboard',
        component: InputDashboardComponent
      },
      {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [SharedHomeModule, RouterModule.forChild(homeRoutes)],
  declarations: [
    HomeComponent,
    DashboardComponent,
    InputDashboardComponent
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
