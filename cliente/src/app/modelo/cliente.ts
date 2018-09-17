import { Login } from './login';

export class Cliente {
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    cedula: number;
    direccion: string;
    telefono: number;
    correo: string;
    login_username: Login;
}
