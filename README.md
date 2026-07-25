# Prueba Técnica Front-End — BEGO

Aplicación de dos pantallas que consume la API mock de BEGO: un listado de pedidos (Cargo Orders) y el detalle de un pedido (Cargo Details).

## Demo

🔗 https://prueba-front-bego.vercel.app

## Stack

- Angular 22 (standalone components, signals)
- TypeScript
- RxJS
- HttpClient para consumo de API
- Open Sans (tipografía del diseño)

## Cómo correr en local

```bash
npm install
ng serve
```

Abrir en `http://localhost:4200`

## Endpoints consumidos

- Pedidos próximos: `GET /orders/upcoming`
- Todos los pedidos: `GET /orders`

Base: `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io`

## Decisiones y limitaciones conocidas

Estas decisiones se tomaron con base en el comportamiento del mock de Postman:

- **El detalle usa un registro fijo:** el mock ignora el ID enviado y devuelve siempre el mismo pedido. El método `getOrderDetail(id)` conserva el parámetro `id` en su firma para reflejar cómo sería la petición real (`/orders/{id}`), aunque el mock no lo procese.
- **Nombres inconsistentes en la API:** el campo de fecha llega como `start_date` en la lista y como `startDate` en el detalle. El modelo contempla ambos.
- **Todos los pedidos son FTL:** aunque el código maneja el ícono para FCL, el mock solo devuelve pedidos tipo FTL, por lo que ese caso no se visualiza.
- **Tabs Completed / Past:** no cuentan con endpoint propio en el mock, por lo que no muestran datos.
- **Avatar del conductor:** se muestran las iniciales del nombre porque el thumbnail del conductor llega vacío/null.
- **Botón "Its time for pickup":** se renderiza condicionalmente según el estado del pedido.
- **Botones sin endpoint asociado** (Track Order, tabs, notificaciones): quedan como elementos visuales, ya que el mock no expone acciones para ellos.

## Estructura

- `components/orders-list` — pantalla de listado
- `components/order-detail` — pantalla de detalle
- `services/orders` — servicio de consumo de API
- `models/order.model` — interfaces tipadas