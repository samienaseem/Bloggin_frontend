import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { UserService } from "./user.service";

export interface BlogPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  images: string[];
  like: number;
  comment: any[];
}

export interface BlogResponse {
  status: boolean;
  blogpost: BlogPost[];
}


@Injectable({
  providedIn: "root",
})
export class BlogService {
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/`);
  }

  // Get a single blog post by ID
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  // Create a new blog post
  // createPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  // }

  createPost(blogData: {
    title: string;
    content: string;
    user: { id: any };
  }): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(`${this.apiUrl}/create`, blogData, { headers });
  }

  // Delete a blog post by ID
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }
  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  //constructor(private readonly db: AngularFirestore) {}

  // createPost(post: Post) {
  //   const postData = JSON.parse(JSON.stringify(post));
  //   return this.db.collection("blogs").add(postData);
  // }

  // getAllPosts(): Observable<Post[]> {
  //   const blogs = this.db
  //     .collection<Post>("blogs", (ref) => ref.orderBy("createdDate", "desc"))
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) => {
  //         return actions.map((c) => ({
  //           postId: c.payload.doc["id"],
  //           ...c.payload.doc.data(),
  //         }));
  //       })
  //     );
  //   return blogs;
  // }

  // getPostbyId(id: string): Observable<Post> {
  //   const blogDetails = this.db.doc<Post>("blogs/" + id).valueChanges();
  //   return blogDetails;
  // }

  // updatePost(postId: string, post: Post) {
  //   const putData = JSON.parse(JSON.stringify(post));
  //   return this.db.doc("blogs/" + postId).update(putData);
  // }

  // deletePost(postId: string) {
  //   return this.db.doc("blogs/" + postId).delete();
  // }
}
