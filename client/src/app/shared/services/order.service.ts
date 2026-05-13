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
  

  private baseUrl = `${environment.apiUrl}/api/orders`; // ✅ FIX URL

  constructor(private http: HttpClient) {}

  // ✅ Typed response
  placeOrder(data: any) {
    return this.http.post<Order>(this.baseUrl, data);
  }

  // ✅ Typed array
  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl);
  }

  // ✅ Typed single object
  getOrderById(id: number) {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  // ✅ Typed array
  getOrdersByCustomer(id: number) {
    return this.http.get<any>(`${this.baseUrl}/userId/${id}`);
  }

  cancelOrder(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/cancel`, {});
  }

   


}
