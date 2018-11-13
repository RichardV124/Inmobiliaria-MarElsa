import { Estudio } from './../../modelo/estudio';
import { Experiencia } from './../../modelo/experiencia';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {

   /**
   * Ruta en la que se encuentran los servicios
   */
  domain = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

    /**
     * Listar registros de una determinada tabla
     * @param tabla la tabla de donde se traera los registros
     * @param objeto los parametros dado el caso que vaya a iltrar
     */
    listar (table: string, object: object) {
        var data = {'tabla' : table, 'objeto' : object};
        return this.http.post<any>(this.domain + '/generico/listar', data)
        .map(res => {
            return res.data;
          });
    }

    /**
     * Returna una variable por get
     * @param {String} sParam Nombre del parametro get
     * @returns {String}
     * @author Johnny Alexander Salazar
     * @version 0.1
    */
   getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
}
