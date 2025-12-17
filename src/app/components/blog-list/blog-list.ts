import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[] = [];
  comments: Comment[] = [];

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  private loadBlogs() {
    forkJoin({
      blogs: this.blogService.getAllBlogs(),
      comments: this.commentService.getAllComments()
    }).subscribe({
      next: ({ blogs, comments }) => {
        this.blogs = blogs.map(blog => ({
          ...blog,
          comments: comments.filter(c => c.blogId === blog.blogId)
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando blogs y comentarios', err)
    });
  }

  canDelete(): boolean {
    return this.authService.isAdminOrSuper();
  }

  deleteBlog(blogId: number) {
    if (!confirm('¿Estás segura de que deseas eliminar este blog?')) return;

    this.blogService.deleteBlog(blogId).subscribe({
      next: () => {
        this.blogs = this.blogs.filter(blog => blog.blogId !== blogId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al eliminar blog', err)
    });
  }
}
