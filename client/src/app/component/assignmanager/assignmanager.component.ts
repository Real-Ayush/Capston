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
export class AssignmanagerComponent  {

  

}
