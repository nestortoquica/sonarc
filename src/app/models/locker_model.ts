
export interface Locker {
    text: number;
    cols: number;
    rows: number;
    class: Status|string;
    order_number : number;
    tracking_number : string;
    status_name : string;
}

export interface Module {
    id: number;
    locker: Locker[]
}

export enum Status {
    CERRADO = 'LOCKER_CERRADO',
    ABIERTO = 'LOCKER_ABIERTO',
    FALLO = 'LOCKER_FALLO',
    OCUPADO = 'LOCKER_OCUPADO',
    SCREEN = 'SCREEN',
    VENCIDO = 'VENCIDO'
}