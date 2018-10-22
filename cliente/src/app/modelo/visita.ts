import { Empleado } from './empleado';
import { Inmueble } from './inmueble';
import { Persona } from './persona';

export class Visita {

    id: number;
    inmueble_id: Inmueble;
    cliente_cedula: Persona;
    empleado_cedula: Empleado;
    tipo_visita: string;
    descripcion: string;
    estado: number;
    fecha: any;
    hora: number;
    comentarios: string;

}
