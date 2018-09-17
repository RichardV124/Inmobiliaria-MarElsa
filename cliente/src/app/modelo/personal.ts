import { Rol } from './rol';
import { Login } from './login';
import { TipoPersonal } from './tipo_personal';
export class Personal {
cedula: string;
nombre: string;
apellido: string;
fecha_nacimiento: Date;
experiencia: string;
tipo_id: TipoPersonal;
formacion: string;
direccion: string;
login: Login;
rol: Rol;
}
