import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(Orders);
  idPedido = '';
  pedido = signal<Pedido | null>(null);

  ngOnInit() {
    this.idPedido = this.route.snapshot.paramMap.get('id') ?? '' ;

    this.orderService.getOrderDetail(this.idPedido).subscribe(respuesta => {
      this.pedido.set(respuesta.result);
    });
  }
}
