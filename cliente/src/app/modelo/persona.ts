import { Rol } from './rol';
import { Login } from './login';
import { TipoPersonal } from './tipo_personal';
import { Municipio } from './municipio';

export class Persona {
    nombre: string;
    apellido: string;
    fecha_nacimiento: any;
    cedula: any;
    direccion: string;
    telefono: number;
    correo: string;
    rol_id: Rol;
    municipio_id: Municipio;
    genero: number;
    activo: number;
}
