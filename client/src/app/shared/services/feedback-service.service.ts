import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../../model/feedback';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = `${environment.apiUrl}/api/feedback`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  // ✅ Submit Feedback
  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(
      `${this.baseUrl}`,
      feedback,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get ALL feedback (tests require this name)
  getFeedbackAllDetails(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.baseUrl}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get feedback by menu item
  getFeedbackByMenuItem(menuItemId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.baseUrl}/menu/${menuItemId}`,
      { headers: this.getHeaders() }
    ).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
