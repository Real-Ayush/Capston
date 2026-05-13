import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../model/restaurant';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../../model/user';
import { AssignManagerRequest } from '../../model/loginrequest';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
   

private apiUrl = `${environment.apiUrl}/api/restaurants`;
constructor(private http:HttpClient){}

getAll(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>(this.apiUrl);
}

getRestaurantById(id: number): Observable<Restaurant> {
  return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
}

createRestaurant(details: Restaurant): Observable<Restaurant> {
  return this.http.post<Restaurant>(this.apiUrl, details);
}

updateRestaurant(id: number, details: Restaurant): Observable<Restaurant> {
  return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, details);
}

deleteRestaurant(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

// ✅ aliases
create(data: Restaurant): Observable<Restaurant> {
  return this.createRestaurant(data);
}

update(id: number, data: Restaurant): Observable<Restaurant> {
  return this.updateRestaurant(id, data);
}

deleteById(id: number): Observable<void> {
  return this.deleteRestaurant(id);
}

getUserDetails(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrl}/users`);
}

}
