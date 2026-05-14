import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../model/restaurant';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { User } from '../../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantManagerAssignmentDTO } from '../../model/restaurant-manager-assignment-dto';

@Component({
  selector: 'app-assignmanager',
  templateUrl: './assignmanager.component.html',
  styleUrls: ['./assignmanager.component.scss']
})
export class AssignmanagerComponent implements OnInit  {

    assignForm!: FormGroup;
  restaurants: Restaurant[] = [];
  managers: User[] = [];
  assignments: RestaurantManagerAssignmentDTO[] = [];
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      restaurantId: ['', Validators.required],
      managerId: ['', Validators.required]
    });
    this.loadRestaurants();
    this.loadAssignments();
  }

  loadRestaurants(): void {
    this.restaurantService.getAll().subscribe({
      next: data => this.restaurants = data
    });
  }

  loadAssignments(): void {
    this.restaurantService.getAllAssignments().subscribe({
      next: data => this.assignments = data
    });
  }

  onSubmit(): void {
    if (this.assignForm.invalid) return;
    const request = {
      ...this.assignForm.value,
      restaurantId: Number(this.assignForm.value.restaurantId),
      managerId: Number(this.assignForm.value.managerId),
      assignedBy: this.auth.getUserId()
    };
    this.restaurantService.assignManager(request).subscribe({
      next: () => {
        this.message = 'Manager assigned successfully!';
        this.errorMessage = '';
        this.assignForm.reset();
        this.loadAssignments();
        this.loadRestaurants();
      },
      error: err => {
        this.errorMessage = err.error?.error || 'Assignment failed';
        this.message = '';
      }
    });
  }

  logout(): void { this.auth.logout(); this.router.navigate(['/login']); }

}
