import { Municipio } from './municipio';
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
seguridad: boolean;
zonas_verdes: boolean;
garajes: number;
salon_comunal: boolean;
conjunto_cerrado: boolean;
cocina_integral: boolean;
gas: boolean;
alarma: boolean;
zona_para_ninios: boolean;
terraza: boolean;
gimnasio: boolean;
piscina: boolean;
balcon: boolean;
num_closets: number;
municipio_id: Municipio;
}
