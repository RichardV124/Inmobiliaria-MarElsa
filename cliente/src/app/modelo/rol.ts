import { Acceso } from './Acceso';

export class Rol {

    id: number = 0;
    nombre: string;
    descripcion: string;
    // Lista de Accesos del rol
    accesos: Array<Acceso> = [];
}
