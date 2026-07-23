export interface Destino{
    nickname: string;
    address: string;
    start_date: number;
}

export interface Pedido{
    _id: string;
    order_number: string;
    type: string;
    status_string: string;
    status_class: string;
    destinations: Destino[];
}

export interface Sobre<T>{
    status: number;
    result: T[];
}
