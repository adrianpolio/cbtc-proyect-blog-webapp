import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { environment } from '.././environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.baseUrl}/${id}`);
  }
}
