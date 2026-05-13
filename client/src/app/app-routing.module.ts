import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MenuItemComponent } from './component/menu-item/menu-item.component';
import { OrderComponent } from './component/order/order.component';
import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { AuthGuard } from './auth.guard';
import { AssignmanagerComponent } from './component/assignmanager/assignmanager.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { CustomerdetailsComponent } from './component/customerdetails/customerdetails.component';


const routes: Routes = [
 //Write your logic here
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
