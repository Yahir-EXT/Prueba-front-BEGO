import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';

@Component({
  selector: 'app-orders-list',
  imports: [],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList implements OnInit {
  private orderService = inject(Orders);
  datos = signal<Pedido[]>([]);

  ngOnInit() {
    this.orderService.getUpcomingOrders().subscribe(respuesta => {
      this.datos.set(respuesta.result);
    });
  }
}
