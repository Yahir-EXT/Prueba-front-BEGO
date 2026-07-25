import { Component, inject, OnInit, signal, computed, OnDestroy, effect } from '@angular/core';
import { Pedido } from '../../models/order.model';
import { Orders } from '../../services/orders';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css',
})
export class OrdersList implements OnInit, OnDestroy {
  private orderService = inject(Orders);
  datos = signal<Pedido[]>([]);
  textoBsqueda = signal('');
  ahora = signal(Date.now());
  private intervalo: any;
  private navegado = false;

  datosFiltrados = computed(() => {
    const texto = this.textoBsqueda().toLowerCase().trim();
    if (!texto) {
      return this.datos();
    }
    return this.datos().filter(item =>
      item.order_number.toLowerCase().includes(texto)
    );
  });

  constructor() {
    effect(() => {
      const pedido = this.datos()[0];
      if (!pedido?.start_date) return;

      if (this.tiempoTerminado(pedido.start_date) && !this.navegado) {
        console.log('Navegar');
        this.navegado = true;
      }
    });
  }

  ngOnInit() {
    this.orderService.getUpcomingOrders().subscribe(respuesta => {
      this.datos.set(respuesta.result);
    });

    this.intervalo = setInterval(() => {
      this.ahora.set(Date.now());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
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

  actualizarBusqueda(valor: string) {
    this.textoBsqueda.set(valor);
  }

  tiempoRestante(startDate?: number): string {
    if (!startDate) return '';
    const diferencia = startDate - this.ahora();

    if (diferencia <= 0) {
      return '';
    }

    const totalSegundos = Math.floor(diferencia / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
  }

  tiempoTerminado(startDate?: number): boolean {
    if (!startDate) return true;
    return startDate - this.ahora() <= 0;
  }
}
