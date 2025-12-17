import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule],
  templateUrl: './blog-create.html',
  styleUrls: ['./blog-create.scss']
})
export class BlogCreateComponent {
  title = '';
  description = '';
  error = '';
  success = '';
  isLoading = false;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  createBlog() {
    const userIdStr = localStorage.getItem('userId');

    if (!userIdStr) {
      this.error = 'Debes iniciar sesión para crear un blog';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    const userId = Number(userIdStr);

    if (!userId || isNaN(userId)) {
      this.error = 'Error: el usuario no está definido correctamente';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    if (!this.title.trim() || !this.description.trim()) {
      this.error = 'Título y descripción son obligatorios';
      return;
    }

    this.error = '';
    this.success = '';

    this.isLoading = true;

    const blogData = {
      title: this.title.trim(),
      description: this.description.trim(),
      userId: userId,
      blogDate: new Date().toISOString() 
    };

    console.log('Enviando blog:', blogData); 

    this.blogService.createBlog(blogData).subscribe({
      next: (res) => {
        console.log('Blog creado con éxito:', res);
        this.isLoading = false;
        this.success = '¡Blog creado exitosamente! Redirigiendo...';
        
        this.title = '';
        this.description = '';
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al crear blog', err);
        this.isLoading = false;
        
        if (err.status === 400) {
          this.error = 'Error en los datos enviados. Revisa los campos.';
        } else if (err.status === 401 || err.status === 403) {
          this.error = 'No tienes permisos para crear un blog. Inicia sesión nuevamente.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else if (err.status === 0) {
          this.error = 'Error de conexión. Verifica tu conexión a internet.';
        } else {
          this.error = 'No se pudo crear el blog. Intenta nuevamente más tarde.';
        }
      }
    });
  }

  clearError() {
    if (this.error) {
      this.error = '';
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}