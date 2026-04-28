import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './guards/auth-guard';
import { PolicyComponent } from './policy/policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compliance', component: ComplaintsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminPanelComponent,canActivate: [AuthGuard] },
  { path: 'policy', component: PolicyComponent },
  { path: '**', redirectTo: '' },
];
