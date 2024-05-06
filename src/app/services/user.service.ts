// src/app/user.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/signup`, user);
  }
}
