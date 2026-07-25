import { Routes } from '@angular/router';
import { OrdersList } from './components/orders-list/orders-list';
import { OrderDetail } from './components/order-detail/order-detail';

export const routes: Routes = [
    { path: '', component: OrdersList },
    { path: 'order/:id', component: OrderDetail }
];
