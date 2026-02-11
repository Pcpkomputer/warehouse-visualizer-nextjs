export type Coordinate = [number, number, number];

export interface Item {
    serialNo: string;
    lot: string;
    description: string;
    condition: string;
    color: string;
    position: {
        x: number;
        y: number;
    };
}

export interface RackData {
    name: string;
    coordinate: Coordinate;
    items: Item[];
}

export interface ZoneData {
    type: string;
    name: string;
    coordinate: Coordinate;
    dimensions: [number, number];
    color: string;
}

export interface RouteData {
    type: string;
    name: string;
    path: Coordinate[];
    color: string;
}

export interface WarehouseData {
    racks: RackData[];
    zones: ZoneData[];
    routes: RouteData[];
}
