import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail';
import { BlogListComponent } from './components/blog-list/blog-list';

export const routes: Routes = [
    { path: '', component: BlogListComponent, pathMatch: 'full' }, 
	{ path: 'login', component: LoginComponent },
    { path: 'blogs/:id', component: BlogDetailComponent },
    { path: 'blogs', component: BlogListComponent },    
    { path: '**', redirectTo: '' }
];
