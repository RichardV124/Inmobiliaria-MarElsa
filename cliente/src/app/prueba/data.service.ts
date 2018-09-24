import { Post } from './models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

ruta = 'http://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts() {
  return this.http.get<Post[]>(`${this.ruta}/posts`).map(res => {
    return res; });
  }
}
