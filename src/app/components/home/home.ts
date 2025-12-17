import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { BlogListComponent } from '../blog-list/blog-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,         
    HeaderComponent,
    BlogListComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  filterText: string = '';                    
  sortOption: 'recent' | 'mostCommented' | 'alphabetical' = 'recent'; 
  
  onSortChange() {
    console.log('Orden seleccionado:', this.sortOption);
  }
}