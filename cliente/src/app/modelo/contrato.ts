import { Venta } from 'src/app/modelo/venta';
import { Arriendo } from './arriendo';

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
