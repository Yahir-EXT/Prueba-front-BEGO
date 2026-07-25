import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [DatePipe],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(Orders);
  private location = inject(Location);
  idPedido = '';
  pedido = signal<Pedido | null>(null);
  panelAbierto = signal(false);
  destinoActivo = signal(0);

  togglePanel() {
    this.panelAbierto.set(!this.panelAbierto());
  }

  ngOnInit() {
    this.idPedido = this.route.snapshot.paramMap.get('id') ?? '';

    this.orderService.getOrderDetail(this.idPedido).subscribe(respuesta => {
      this.pedido.set(respuesta.result);
    });
  }

  obtenerCiudad(direccion: string): string {
    const partes = direccion.split(',');
    if (partes.length < 3) {
      return direccion.trim();
    }
    const segmentoCiudad = partes[partes.length - 3].trim();
    return segmentoCiudad.replace(/^\d+\s*/, '');
  }

  obtenerCalle(direccion: string): string {
    return direccion.split(',')[0].trim();
  }

  regresar() {
    this.location.back();
  }

  trackOrder(){
    console.log('Track Order');
  }

  alternarDestino(){
    this.destinoActivo.set(this.destinoActivo() === 0 ? 1 : 0);
  }
}
