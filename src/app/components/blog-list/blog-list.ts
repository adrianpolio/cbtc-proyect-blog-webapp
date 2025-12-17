import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
export class BlogListComponent implements OnInit, OnChanges {

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];

  @Input() filterText: string = '';
  @Input() sortOption: 'recent' | 'mostCommented' | 'alphabetical' = 'recent'; // Cambiado aquí

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterText'] || changes['sortOption']) {
      this.applySort();
      this.applyFilter();
    }
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
        this.applySort();
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando blogs y comentarios', err)
    });
  }

  private applyFilter() {
    const text = this.filterText.toLowerCase();
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(text) || blog.userName.toLowerCase().includes(text)
    );
  }

  private applySort() {
    if (this.sortOption === 'recent') {
      this.blogs.sort((a, b) => new Date(b.blogDate).getTime() - new Date(a.blogDate).getTime());
    } else if (this.sortOption === 'mostCommented') {
      this.blogs.sort((a, b) => b.comments.length - a.comments.length);
    } else if (this.sortOption === 'alphabetical') {
      this.blogs.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  goToBlog(blogId: number) {
    this.router.navigate(['/blogs', blogId]);
  }

  canDelete(blog: Blog): boolean {
    const username = localStorage.getItem('username');
    return blog.userName === username || this.authService.isAdminOrSuper();
  }

  canEdit(blog: Blog): boolean {
    const username = localStorage.getItem('username');
    return blog.userName === username;
  }

  editBlog(blogId: number) {
    this.router.navigate(['/blogs/edit', blogId]);
  }

  deleteBlog(blogId: number) {
    if (!confirm('¿Estás segura de que deseas eliminar este blog?')) return;

    this.blogService.deleteBlog(blogId).subscribe({
      next: () => {
        this.blogs = this.blogs.filter(blog => blog.blogId !== blogId);
        this.filteredBlogs = this.filteredBlogs.filter(blog => blog.blogId !== blogId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al eliminar blog', err)
    });
  }
}