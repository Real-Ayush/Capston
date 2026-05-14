import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}/api/orders`;

  constructor(
    private http: HttpClient,
    private authService: AuthService   // ✅ ADD THIS
  ) {}

  // ✅ ADD THIS METHOD
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    };
  }

  // ✅ FIXED
  placeOrder(data: any): Observable<Order> {
    return this.http.post<Order>(
      this.baseUrl,
      data,
      this.getHeaders()   // ✅ THIS IS THE FINAL FIX
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.baseUrl,
      this.getHeaders()
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${this.baseUrl}/${id}`,
      this.getHeaders()
    );
  }

  getOrdersByCustomer(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/userId/${id}`,
      this.getHeaders()
    );
  }

  cancelOrder(id: number) {
    return this.http.put(
      `${this.baseUrl}/${id}/cancel`,
      {},
      this.getHeaders()
    );
  }
}