// services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models/blog.model';

export interface CommentRequest {
  blogId: number;
  comment: string;
  userId: number;
  userName?: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService {

  private baseUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl);
  }
  saveComment(comment: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment);
  }
}
