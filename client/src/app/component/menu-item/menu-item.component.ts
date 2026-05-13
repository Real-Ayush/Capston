import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { Restaurant } from '../../model/restaurant';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit  {

  menuItems: MenuItem[] = [];
  restaurants: Restaurant[] = [];

  menuItemForm!: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private menuItemService: MenuItemService,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.menuItemForm = this.fb.group({
      name: ['', Validators.required],
      menuType: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [''],
      restaurantId: ['', Validators.required]
    });

    this.loadMenuItems();
    this.loadRestaurants();
  }

  loadMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe((data: any) => {
      this.menuItems = data;
    });
  }

  loadRestaurants() {
    this.restaurantService.getAll().subscribe((data: any) => {
      this.restaurants = data;
    });
  }

  onSubmit() {
    if (this.menuItemForm.invalid) return;

    const formData = this.menuItemForm.value;

    if (this.editingId) {
      this.menuItemService.updateMenuItem(this.editingId, formData)
        .subscribe(() => {
          this.loadMenuItems();
          this.cancelEdit();
        });
    } else {
      this.menuItemService.addMenuItem(formData)
        .subscribe(() => {
          this.loadMenuItems();
          this.menuItemForm.reset();
        });
    }
  }

  editMenuItem(item: MenuItem) {
    this.editingId = item.id!;

    this.menuItemForm.patchValue({
      name: item.name,
      menuType: item.menuType,
      price: item.price,
      quantity: item.quantity,
      restaurantId: item.restaurant?.id
    });
  }

  deleteMenuItem(id: number) {
    this.menuItemService.deleteMenuItem(id).subscribe(() => {
      this.loadMenuItems();
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.menuItemForm.reset();
  }



}
