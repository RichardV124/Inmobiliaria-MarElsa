import { Inmueble } from './inmueble';
import { Persona } from './persona';
export class Venta {
    id: number;
    descripcion: string;
    inmueble_id: Inmueble;
    cliente_cedula: Persona;
    empleado_cedula: Persona;
    activo: boolean;
}
