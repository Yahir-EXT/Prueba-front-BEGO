import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';
import {DatePipe} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  imports: [DatePipe, RouterLink],
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

  obtenerCiudad(direccion: string): string{
    const partes = direccion.split(',');
    if(partes.length < 3){
      return direccion.trim();
    }
    const segmentoCiudad = partes[partes.length -3].trim();
    return segmentoCiudad.replace(/^\d+\s*/, '');
  }

  obtenerCalle(direccion: string): string{
    return direccion.split(',')[0].trim();
  }
}
