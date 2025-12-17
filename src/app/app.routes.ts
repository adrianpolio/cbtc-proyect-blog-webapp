import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail';
import { BlogListComponent } from './components/blog-list/blog-list';
import { BlogCreateComponent } from './components/blog-create/blog-create';
import { RegisterComponent } from './components/register/register';
import { BlogEditComponent } from './components/blog-edit/blog-edit';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' }, 
	{ path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'blogs/create', component: BlogCreateComponent },  
    { path: 'blogs/:id', component: BlogDetailComponent },
    { path: 'blogs/edit/:id', component: BlogEditComponent },
    { path: 'blogs', component: BlogListComponent }, 
    { path: '**', redirectTo: '' }
];
