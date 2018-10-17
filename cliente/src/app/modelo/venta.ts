import { Inmueble } from './inmueble';
import { Persona } from './persona';
import { Visita } from './visita';
import { Empleado } from './empleado';
export class Venta {
    id: number;
    cliente_cedula: Persona;
    empleado_cedula: Persona;
    visita_id: Visita;
    inmueble_id: Inmueble;
    activo: boolean;
}
