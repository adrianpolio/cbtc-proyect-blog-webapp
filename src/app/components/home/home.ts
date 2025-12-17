import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from '../../shared/header/header'
import { BlogListComponent } from '../blog-list/blog-list'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BlogListComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']

})
export class HomeComponent {}
