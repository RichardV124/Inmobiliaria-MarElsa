import { Login } from './login';
import { Rol } from './rol';
import { Municipio } from './municipio';

export class Cliente {
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    cedula: number;
    direccion: string;
    telefono: number;
    correo: string;
    rol_id: Rol;
    municipio_id: Municipio;
    genero: number;
}
