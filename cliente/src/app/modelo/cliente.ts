import { Login } from './login';
import { Rol } from './rol';

export class Cliente {
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    cedula: number;
    direccion: string;
    telefono: number;
    correo: string;
    login_username: Login;
    rol_id: Rol;
}
