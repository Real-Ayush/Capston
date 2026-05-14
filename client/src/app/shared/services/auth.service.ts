import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role, User } from '../../model/user';
import { Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../../model/loginrequest';
import { LoginResponse } from '../../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

   register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  
  
  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getLoginStatus() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  getLoggedInUser() {
    return of({
      username: localStorage.getItem('username')
    });
  }
   getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
    login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.id.toString());
      })
    );
  }
    getUsername(): string | null {
    return localStorage.getItem('username');
  }



}
