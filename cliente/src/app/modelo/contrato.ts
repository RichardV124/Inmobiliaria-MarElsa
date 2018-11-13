import { Arriendo } from './arriendo';
import { Venta } from './venta';


export class Contrato {
id: number;
descripcion: string;
contrato: string;
arriendo_id: Arriendo;
venta_id: Venta;
precio: number;
fecha: any;
activo: number;
}
