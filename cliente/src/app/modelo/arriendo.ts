import { Visita } from './visita';
import { Inmueble } from './inmueble';
import { Persona } from './persona';
export class Arriendo {
    id: number;
    inmueble_id: Inmueble;
    cliente_cedula: Persona;
    empleado_cedula: Persona;
    visita_id: Visita;
    activo: boolean;
}
