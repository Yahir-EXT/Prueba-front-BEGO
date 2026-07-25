import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido, Sobre, SobreDetalle } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Orders {
    private http = inject(HttpClient);
    private readonly urlBase = "https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io";

    getUpcomingOrders(): Observable<Sobre<Pedido>> {
        return this.http.get<Sobre<Pedido>>(`${this.urlBase}/orders/upcoming`);
    }

    getOrderDetail(id: string): Observable<SobreDetalle<Pedido>> {
        return this.http.get<SobreDetalle<Pedido>>(`${this.urlBase}/orders`);
    }
}
