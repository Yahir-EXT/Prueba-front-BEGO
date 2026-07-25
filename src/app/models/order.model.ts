export interface Destino {
    nickname: string;
    address: string;
    start_date: number;
    status_string?: string;
    status_class?: string;
}

export interface Pedido {
    _id: string;
    order_number: string;
    type: string;
    status_string: string;
    status_class: string;
    destinations: Destino[];
    reference_number?: string;
}

export interface Sobre<T> {
    status: number;
    result: T[];
}

export interface SobreDetalle<T> {
    status: number;
    result: T;
}
