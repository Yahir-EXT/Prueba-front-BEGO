export interface Destino {
    nickname: string;
    address: string;
    start_date?: number;
    startDate?: number;
    status_string?: string;
    status_class?: string;
    contact_info?: {
        name?: string;
        telephone?: string;
        email?: string;
    };
}

export interface Pedido {
    _id: string;
    order_number: string;
    type: string;
    status: number;
    status_string: string;
    status_class: string;
    destinations: Destino[];
    reference_number?: string;
    status_list?: StatusList;
    driver?: { nickname?: string };
    start_date?: number;
    startDate?: number;
}

export interface Sobre<T> {
    status: number;
    result: T[];
}

export interface SobreDetalle<T> {
    status: number;
    result: T;
}

export interface PasoEstado {
    active: boolean;
    status: string;
}

export interface StatusList {
    pickup: PasoEstado[];
    dropoff: PasoEstado[];
}