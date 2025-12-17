import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { Blog, Comment } from '../../models/blog.model';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.scss']
})
export class BlogDetailComponent implements OnInit {

  blog: Blog | null = null;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBlog(id);
  }

  loadBlog(id: number) {
    this.blogService.getBlogById(id).subscribe({
      next: (data) => {
        this.blog = data;
        if (!this.blog.comments) this.blog.comments = [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar blog', err)
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  addComment() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const userIdStr = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || 'Usuario';

    if (!userIdStr) {
      alert('Debes iniciar sesión para comentar');
      this.router.navigate(['/login']);
      return;
    }

    const userId = Number(userIdStr);

    if (!this.newComment.trim() || !this.blog) return;

    const commentPayload = {
      comment: this.newComment.trim(),
      blogId: this.blog.blogId,
      userId: userId
    };


    this.commentService.saveComment(commentPayload).subscribe({
      next: (res: Comment) => {
        const commentWithUser: Comment = {
          ...res,
          userName: localStorage.getItem('userName') || 'Usuario'
        };
        this.blog?.comments.push(commentWithUser);
        this.newComment = '';
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al publicar comentario', err)
    });
  }

  canDelete(): boolean {
    return this.authService.isAdminOrSuper();
  }

  deleteComment(commentId: number) {
    if (!confirm('¿Estás segura de que deseas eliminar este comentario?')) return;

    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        if (this.blog) {
          this.blog.comments = this.blog.comments.filter(c => c.commentId !== commentId);
        }
        this.cdr.detectChanges();
        alert('Comentario eliminado con éxito');
      },
      error: (err) => {
        console.error('Error al eliminar comentario', err);
        alert('No se pudo eliminar el comentario.');
      }
    });
  }
}
