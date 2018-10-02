import { Estudio } from './../../modelo/estudio';
import { Experiencia } from './../../modelo/experiencia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

   /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }


   /**
  * Metodo que inserta una experiencia de un empleado en la BD
  * @param experiencia, la experiencia del empleado que se va a registrar en la BD
  */
 registrarExperiencia(experiencia: Experiencia) {
  return this.http.post<any>(`${this.domain}/experiencia/save`, experiencia)
    .map(res => res);
}

/**
  * Metodo que inserta un estudio de un empleado en la BD
  * @param estudio, el estudio del empleado que se va a registrar en la BD
  */
 registrarEstudio(estudio: Estudio) {
  return this.http.post<any>(`${this.domain}/estudio/save`, estudio)
    .map(res => res);
}


   /**
   * Lista las experiencias por la cedula del empleado
   */
  listarExperiencias(cedula: string) {
    return this.http.get<any>(`${this.domain}/experiencia/listar/${cedula}`)
    .map(res => {
      return res.data;
    });
  }

  /**
   * Lista los estudios por la cedula del empleado
   */
  listarEstudios(cedula: string) {
    return this.http.get<any>(`${this.domain}/estudio/listar/${cedula}`)
    .map(res => {
      return res.data;
    });
  }


  /**
   * Metodo para buscar una experiencia
   * @param id, id por el cual se buscara la experiencia, se envia por la ruta
   */
  buscarExperiencia(id: number) {
    return this.http.get<any>(`${this.domain}/experiencia/search/${id}`)
    .map(res => {
      return res.data;
  });

  }

  /**
   * Metodo para buscar un estudio
   * @param id, id por el cual se buscara el estudio, se envia por la ruta
   */
  buscarEstudio(id: number) {
    return this.http.get<any>(`${this.domain}/estudio/search/${id}`)
    .map(res => {
      return res.data;
  });

  }

  /**
 * Metodo que elimina una experiencia a un empleado en la BD
 * @param experiencia, la experiencia que se va a eliminar en la BD
 */
eliminarExperiencia(experiencia: Experiencia) {
  console.log(experiencia);
  return this.http.post<any>(`${this.domain}/experiencia/delete/`, experiencia)
    .map(res => res);
}

 /**
 * Metodo que elimina una formacion a un empleado en la BD
 * @param estudio, el estudio que se va a eliminar en la BD
 */
eliminarEstudio(estudio: Estudio) {
  console.log(estudio);
  return this.http.post<any>(`${this.domain}/estudio/delete/`, estudio)
    .map(res => res);
}

}
