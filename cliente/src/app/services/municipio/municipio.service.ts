import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

   /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  /**
   * Lista los municipio por el id del departamento
   */
  listarMunicipios(id: number) {
  return this.http.get<any>(`${this.domain}/municipio/list/${id}`)
  .map(res => {
    return res.data;
  });
}

/**
 * Lista los depatamentos registrados en la bd
 */
listarDepartamentos() {
  return this.http.get<any>(`${this.domain}/departamento/list`)
  .map(res => {
    return res.data;
  });
}

/**
   * Metodo para buscar un municipio
   * @param id, id por el cual se buscara el municipio, se envia por la ruta
   */
  buscarMunicipio(id: number) {
    return this.http.get<any>(`${this.domain}/municipio/search/${id}`)
    .map(res => {
      return res.data;
  });

  }

  /**
   * Metodo para buscar un Departamento
   * @param id, id por el cual se buscara el Departamento, se envia por la ruta
   */
  buscarDepartamento(id: number) {
    return this.http.get<any>(`${this.domain}/departamento/search/${id}`)
    .map(res => {
      return res.data;
  });

  }
}
