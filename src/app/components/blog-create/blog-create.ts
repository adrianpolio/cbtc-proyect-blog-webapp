import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { HeaderComponent } from '../../shared/header/header';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './blog-create.html',
  styleUrls: ['./blog-create.scss']
})
export class BlogCreateComponent {

  title = '';
  description = '';
  error = '';

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  createBlog() {
    // Obtener userId desde localStorage
    const userIdStr = localStorage.getItem('userId');

    if (!userIdStr) {
      alert('Debes iniciar sesión para crear un blog');
      this.router.navigate(['/login']);
      return;
    }

    const userId = Number(userIdStr);

    // Validación de userId
    if (!userId || isNaN(userId)) {
      alert('Error: el usuario no está definido correctamente');
      this.router.navigate(['/login']);
      return;
    }

    // Validación de campos
    if (!this.title.trim() || !this.description.trim()) {
      this.error = 'Título y descripción son obligatorios';
      return;
    }

    // Preparar datos a enviar
    const blogData = {
      title: this.title.trim(),
      description: this.description.trim(),
      userId: userId
    };

    console.log('Enviando blog:', blogData); // Para depuración

    // Llamada al servicio
    this.blogService.createBlog(blogData).subscribe({
      next: (res) => {
        console.log('Blog creado con éxito:', res);
        this.router.navigate(['/']); // Redirigir al inicio
      },
      error: (err) => {
        console.error('Error al crear blog', err);
        if (err.status === 400) {
          this.error = 'Error en los datos enviados. Revisa los campos.';
        } else {
          this.error = 'No se pudo crear el blog. Intenta nuevamente más tarde.';
        }
      }
    });
  }
}
