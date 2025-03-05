import { Routes } from '@angular/router';
import { MasterComponent } from './layouts/master/master.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageUserComponent } from './pages/user/manage-user/manage-user.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: ManageUserComponent },
      {
        path: 'users/create',
        component: FormUserComponent,
      },
      {
        path: 'users/:id/edit',
        component: FormUserComponent,
      },
    ],
  },
];
