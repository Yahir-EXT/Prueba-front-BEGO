import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersList } from './components/orders-list/orders-list';

@Component({
  selector: 'app-root',
  imports: [OrdersList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bego-frontend-test');
}
