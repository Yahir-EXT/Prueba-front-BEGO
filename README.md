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
- Detalle del pedido: `GET /orders`

Base: `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io`

## Funcionalidades

**Pantalla de listado (Cargo Orders):**
- Buscador que filtra los pedidos por número de orden.
- Botón "Its time for pickup" que se renderiza condicionalmente según el estado del pedido.
- Temporizador de recolección: compara el `start_date` del pedido con la hora actual y muestra una cuenta regresiva. Al terminar, habilita el botón y emite `"Navegar"` en consola.
- Botón "Resume" que navega al detalle del pedido.

**Pantalla de detalle (Cargo Details):**
- Switch Pickup/Dropoff: al hacer click en la tarjeta de ruta, alterna entre mostrar los datos de recolección o de entrega (desde la llave `destinations`).
- Timeline de estados con checks activos según `status_list`.
- Botón "Track Order" que solo se activa cuando el `status` del pedido es 3 o mayor; al hacer click emite `"Track Order"` en consola.
- Panel "Pickup Data" expandible.
- Navegación de regreso al listado.

## Decisiones y limitaciones conocidas

Estas decisiones se tomaron con base en el comportamiento del mock de Postman:

- **El detalle devuelve un registro fijo:** el endpoint del detalle ignora el ID y responde siempre con el mismo pedido. El método `getOrderDetail(id)` conserva el parámetro `id` para reflejar cómo sería la petición en una API real (`/orders/{id}`).
- **Nombres inconsistentes en la API:** el campo de fecha llega como `start_date` en el listado y como `startDate` en el detalle. El modelo contempla ambos.
- **Todos los pedidos son FTL:** aunque el código maneja el ícono para FCL, el mock solo devuelve pedidos FTL, por lo que ese caso no se visualiza.
- **Temporizador con fechas vencidas:** los `start_date` del mock ya pasaron respecto a la fecha actual, por lo que el temporizador muestra el botón habilitado (y emite "Navegar") en lugar de una cuenta regresiva en vivo. La lógica de conteo funciona correctamente con fechas futuras.
- **Tabs Completed / Past:** no cuentan con endpoint propio en el mock, por lo que no muestran datos.
- **Avatar del conductor:** se muestran las iniciales del nombre porque el thumbnail llega vacío/null.

## Estructura

- `components/orders-list` — pantalla de listado
- `components/order-detail` — pantalla de detalle
- `services/orders` — servicio de consumo de API
- `models/order.model` — interfaces tipadas