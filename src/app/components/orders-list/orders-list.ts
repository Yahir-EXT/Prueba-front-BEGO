import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [DatePipe],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList implements OnInit {
  private orderService = inject(Orders);
  datos = signal<Pedido[]>([]);
  cargaCompleta : boolean = false;

  ngOnInit() {
    this.orderService.getUpcomingOrders().subscribe(respuesta => {
      this.datos.set(respuesta.result);
      this.cargaCompleta = true;
      console.log(this.cargaCompleta)
    });
  }
}
