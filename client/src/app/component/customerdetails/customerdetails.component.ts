import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { OrderService } from '../../shared/services/order.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../model/user';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.scss']
})
export class CustomerdetailsComponent  {
  
     
  customers: User[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // ✅ LOAD CUSTOMER DATA
  loadCustomers() {
    this.restaurantService.getUserDetails()
      .subscribe((data: User[]) => {
        this.customers = data;
      });
  }

  // ✅ LOGOUT
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
