import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { Order } from '../../model/order';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit  {
 //Write your logic here
   username = '';
  role = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.auth.getUsername() || '';
    this.role = this.auth.getRole() || '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean { return this.role === 'ADMIN'; }
  isManager(): boolean { return this.role === 'MANAGER'; }
  isCustomer(): boolean { return this.role === 'CUSTOMER'; }


}
