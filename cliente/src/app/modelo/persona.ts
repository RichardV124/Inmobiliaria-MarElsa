import { Rol } from './rol';
import { Login } from './login';
import { TipoPersonal } from './tipo_personal';
import { Municipio } from './municipio';
export class Persona {
cedula: string;
nombre: string;
apellido: string;
fecha_nacimiento: Date;
direccion: string;
telefono: number;
correo: string;
rol: Rol;
municipio: Municipio;
}
