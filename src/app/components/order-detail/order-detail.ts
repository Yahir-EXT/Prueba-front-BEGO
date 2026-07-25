import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail {
  private route = inject(ActivatedRoute);
  idPedido = '';

  ngOnInit() {
    this.idPedido = this.route.snapshot.paramMap.get('id') ?? '' ;
  }
}
