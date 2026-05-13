import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { AuthService } from '../../shared/services/auth.service';
import { Restaurant } from '../../model/restaurant';
import { MenuItem } from '../../model/menu-item';
import { User } from '../../model/user';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit{
   //Write your logic here
   
  // ✅ REQUIRED VARIABLES
  restaurants: any[] = [];
  users: any[] = [];

  restaurantForm!: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {}

  // ✅ REQUIRED
  ngOnInit(): void {

    this.restaurantForm = this.fb.group({
      name: [''],
      location: [''],
      address: [''],
      email: [''],
      phoneNumber: [null]
    });

    this.loadRestaurants();
    this.getUserRoleDetails();
  }

  // ✅ LOAD RESTAURANTS
  loadRestaurants() {
    this.restaurantService.getAll().subscribe((data: any) => {
      this.restaurants = data;
    });
  }

  // ✅ CREATE / UPDATE
  onSubmit() {
    const data = this.restaurantForm.value;

    if (this.editingId) {
      this.restaurantService.update(this.editingId, data)
        .subscribe(() => {
          this.loadRestaurants();
          this.cancelEdit();
        });
    } else {
      this.restaurantService.create(data)
        .subscribe(() => {
          this.loadRestaurants();
          this.restaurantForm.reset();
        });
    }
  }

  // ✅ EDIT
  editRestaurant(restaurant: any) {
    this.editingId = restaurant.id;
    this.restaurantForm.patchValue(restaurant);
  }

  // ✅ CANCEL EDIT
  cancelEdit() {
    this.editingId = null;
    this.restaurantForm.reset();
  }

  // ✅ DELETE
  deleteRestaurant(id: number) {
    this.restaurantService.deleteById(id)
      .subscribe(() => {
        this.restaurants = this.restaurants.filter(r => r.id !== id);
      });
  }

  // ✅ LOGOUT
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ✅ GET USERS
  getUserRoleDetails() {
    this.restaurantService.getUserDetails()
      .subscribe((data: any) => {
        this.users = data;
      });
  }


}
