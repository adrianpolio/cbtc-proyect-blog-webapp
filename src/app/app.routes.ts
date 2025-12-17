import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail';
import { BlogListComponent } from './components/blog-list/blog-list';
import { BlogCreateComponent } from './components/blog-create/blog-create';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, 
	{ path: 'login', component: LoginComponent },
    { path: 'blogs/create', component: BlogCreateComponent },  
    { path: 'blogs/:id', component: BlogDetailComponent },
    { path: 'blogs', component: BlogListComponent }, 
    { path: '**', redirectTo: '' }
];
