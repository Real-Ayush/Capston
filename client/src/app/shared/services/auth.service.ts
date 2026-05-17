import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../../model/loginrequest';
import { LoginResponse } from '../../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // ✅ REGISTER (old method - still useful if needed)
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // getAllUser(){
  //   return this.http.get<User[]>(`${this.apiUrl}/`)
  // }

  // ✅ NEW: SEND OTP TO EMAIL
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, {
      email: email
    });
  }

  // ✅ NEW: VERIFY OTP + REGISTER USER
  verifyOtpAndRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-register`, data);
  }

  // ✅ LOGIN
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.id.toString());
      })
    );
  }

  // ✅ TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ ROLE
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ✅ LOGIN STATUS
  getLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ LOGOUT
  logout(): void {
    localStorage.clear();
  }

  // ✅ USER INFO
  getLoggedInUser() {
    return of({
      username: localStorage.getItem('username')
    });
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
