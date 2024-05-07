// src/app/user.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


export interface LoginResponse {
  status: boolean;
  message: string;
  userResponse: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8080/api";

  private currentUser: LoginResponse["userResponse"] | null = null;

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/signup`, user);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string): void {
    sessionStorage.setItem("jwt_token", token);
  }

  getToken(): string | null {
    return sessionStorage.getItem("jwt_token");
  }

  setUser(user: LoginResponse["userResponse"]): void {
    this.currentUser = user;
  }

  getUser(): LoginResponse["userResponse"] | null {
    return this.currentUser;
  }
}
