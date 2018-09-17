import { TipoInmueble } from './tipo_inmueble';
export class Inmueble {
id: number;
direccion: string;
area: number;
tipo_inmueble_id: TipoInmueble;
valor: number;
promocion: number;
num_habitaciones: number;
num_banios: number;
pisos: number;
}
