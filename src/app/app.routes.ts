import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FilesComponent } from './pages/files/files.component';
import { UploadComponent } from './pages/upload/upload.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'register',
        component: RegisterComponent
    },

    {
        path: 'files',
        canActivate: [authGuard],
        component: FilesComponent
    },

    {
        path: 'upload',
        canActivate: [authGuard],
        component: UploadComponent
    },

    {
        path: 'settings',
        component: SettingsComponent
    },

    {
        path: '**',
        redirectTo: '' 
    }

];