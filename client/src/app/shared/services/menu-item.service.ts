import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../../model/menu-item';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private apiUrl = `${environment.apiUrl}/api/menuItems`;

  constructor(private http: HttpClient) { }

  // Get all menu items
  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu-items`);
  }

  // Get menu items by restaurant
  getMenuItemsByRestaurant(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${this.apiUrl}/restaurants/${restaurantId}/menu-items`
    );
  }
  getMenuItemById(id: number):Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/menultems/${id}`);
  }


  // Create menu item
  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(
      `${this.apiUrl}/menu-items`,
      menuItem
    );
  }

  // Update menu item
  updateMenuItem(id: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(
      `${this.apiUrl}/menu-items/${id}`,
      menuItem
    );
  }

  // Delete menu item
  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/menu-items/${id}`
    );
  }
}

