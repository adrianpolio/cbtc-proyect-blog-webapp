import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { Blog, Comment } from '../../models/blog.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
    private router: Router
  ) {}

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

    const userId = Number(localStorage.getItem('userId'));
    const userName = localStorage.getItem('userName') || 'Usuario';

    if (!this.newComment.trim() || !this.blog) return;

    this.commentService.saveComment({
      blogId: this.blog.blogId,
      comment: this.newComment.trim(),
      userId: userId,
      userName: userName
    }).subscribe({
      next: (res: Comment) => {
        this.blog?.comments.push(res); 
        this.newComment = '';           
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al publicar comentario', err)
    });
  }
}
