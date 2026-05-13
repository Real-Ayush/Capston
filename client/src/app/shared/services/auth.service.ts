import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role, User } from '../../model/user';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../../model/loginrequest';
import { LoginResponse } from '../../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
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


}
