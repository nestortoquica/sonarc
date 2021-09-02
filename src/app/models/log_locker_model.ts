export interface LogLocker {
    id?: number;
    lockerID?: string;
    totalDeliveries?: number;
    totalUnclaimed?: number;
    doors?: number;
    available?: number;
    status?: string|boolean;
    serial?: number|string;
    deliveries?: number;
    total?: number;
    lat?: number|string;
    lng?: number|string;
    address?: string;
    location?: string
}