import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { ChangeDetectorRef } from '@angular/core';
import { Blog } from '../../models/blog.model';
import { CommentService } from '../../services/comment.service';
import { forkJoin } from 'rxjs';


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
    private cdr: ChangeDetectorRef,
    private commentService: CommentService
  ) {}

ngOnInit(): void {
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
    error: (err) => console.error(err)
  });
}}