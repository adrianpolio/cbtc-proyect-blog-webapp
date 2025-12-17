import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-edit',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './blog-edit.html',
  styleUrls: ['./blog-edit.scss']
})
export class BlogEditComponent implements OnInit {
  blog: any = {};
  error = '';
  success = '';
  currentUserId = Number(localStorage.getItem('userId'));

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}
  goHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID de blog inválido');
      this.router.navigate(['/']);
      return;
    }

    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        if (blog.userId !== this.currentUserId) {
          alert('No tienes permisos para editar este blog');
          this.router.navigate(['/']);
          return;
        }
        this.blog = blog;
      },
      error: () => {
        alert('Blog no encontrado');
        this.router.navigate(['/']);
      }
    });
  }

  updateBlog() {
    if (!this.blog.title || !this.blog.description) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.blogService.updateBlog(this.blog.blogId, this.blog).subscribe({
      next: () => {
        this.success = 'Blog actualizado correctamente';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => (this.error = 'Error al actualizar el blog')
    });
  }
}
