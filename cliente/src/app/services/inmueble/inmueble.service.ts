import { Archivo } from './../../modelo/archivo';
import { Inmueble } from './../../modelo/inmueble';
import { Injectable } from '@angular/core';
import { RespuestaDTO } from '../../modelo/respuestaDTO';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

   /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  /**
 * Metodo que lista todos los inmuebles de la BD
 */
  listarInmuebles() {
    return this.http.get<any>(`${this.domain}/inmueble`)
    . map(res => {
        return res.data;
     });
  }

  buscarTipoInmuebleId(id: number) {
    return this.http.get<any>(`${this.domain}/tipoinmueble/search/${id}`)
    .map(res => {
      return res.data;
    });
  }

  registrarArchivo(newArchivo: Archivo) {
    console.log(newArchivo);
    return this.http.post<any>(`${this.domain}/file/add`, newArchivo)
    .map(res => res);
  }

  listarArchivos(inmueble_id: number) {
    return this.http.get<any>(`${this.domain}/file/search/${inmueble_id}`)
    .map(res => {
      return res.data;
    });
  }

  eliminarArchivo(archivo: Archivo) {
    return this.http.post<any>(`${this.domain}/file/delete/`, archivo)
    .map(res => res);
  }


  /**
   * Elimina un inmueble de la bd
   */
  eliminarInmueble(inmueble: Inmueble) {
    return this.http.post<any>(`${this.domain}/inmueble/delete/`, inmueble)
    .map(res => res);
  }

  editar(newInmueble: Inmueble) {
    return this.http.post<any>(`${this.domain}/inmueble/edit/`, newInmueble)
    .map(res => res);
  }

   /**
 * Metodo que lista todos los tipos de inmuebles de la BD
 */
listarTiposInmueble() {
  return this.http.get<any>(`${this.domain}/tipoinmueble`)
  . map(res => {
      return res.data;
   });
}

  /**
 * Metodo que inserta un inmueble en la BD
 * @param newInmueble, el inmueble que se va a registrar en la BD
 */
  registrarInmueble(newInmueble: Inmueble) {
   return this.http.post<any>(`${this.domain}/inmueble/add`, newInmueble)
    .map(res => res);
  }

  /**
 * Metodo para buscar un inmueble
 * @param id, id por el cual se buscara el inmueble, se envia por la ruta
 */
  buscarInmueble(matricula: string) {
    return this.http.get<any>(`${this.domain}/inmueble/search/${matricula}`)
    .map(res => {
      return res.data;
    });
  }

}
