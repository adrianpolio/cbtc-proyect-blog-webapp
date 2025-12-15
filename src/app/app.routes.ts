import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: Home }, 
	{ path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
