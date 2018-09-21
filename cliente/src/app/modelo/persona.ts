import { Rol } from './rol';
import { Login } from './login';
import { TipoPersonal } from './tipo_personal';
import { Municipio } from './municipio';

export class Persona {
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    cedula: string;
    direccion: string;
    telefono: number;
    correo: string;
    rol_id: Rol;
    municipio_id: Municipio;

}
