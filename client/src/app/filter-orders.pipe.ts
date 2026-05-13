import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrders'
})
export class FilterOrdersPipe implements PipeTransform {
  transform(orders: any[], searchText: string): any[] {
    if (!orders || !searchText) {
      return orders;
    }

    searchText = searchText.toLowerCase();

    return orders.filter(order =>
      order.customerName?.toLowerCase().includes(searchText) ||
      order.status?.toLowerCase().includes(searchText)
    );
  }
}
