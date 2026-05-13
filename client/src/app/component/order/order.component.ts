import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../model/order';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { MenuItemService } from '../../shared/services/menu-item.service';
import { MenuItem } from '../../model/menu-item';
import { Restaurant } from '../../model/restaurant';
import { User } from '../../model/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit  {
   //Write your logic here
   
 
  orderForm!: FormGroup;

  items: any[] = [];   // required
  pendingOrders: any[] = [];
  loggedInUser: any;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      customerName: [''],
      orderDate: ['']
    });

    this.loggedInUser = { id: 1, username: 'john' };
  }

  // ✅ calculate total
  getTotalAmount(): number {
    let total = 0;
    this.items.forEach((item: any) => {
      const value = item.value;
      if (value) {
        total += value.price * value.quantity;
      }
    });
    return total;
  }

  // ✅ today date
  getTodayDate() {
    return new Date().toISOString().split('T')[0];
  }

  // ✅ create pending order
  onSubmit() {
    const order = {
      ...this.orderForm.value,
      totalAmount: this.getTotalAmount()
    };

    this.pendingOrders.push(order);
  }

  // ✅ submit order
  submitPendingOrder(order: any) {
    this.orderService.placeOrder(order).subscribe(() => {});
  }

  // ✅ cancel order
  cancelOrder(order: any) {
    this.orderService.cancelOrder(order.id).subscribe(() => {});
  }

  // ✅ view order
  viewOrder(order: any) {
    this.editingId = order.id;
    this.orderForm.disable();
  }

  // ✅ cancel view
  cancelView() {
    this.editingId = null;
    this.orderForm.enable();
  }


}
