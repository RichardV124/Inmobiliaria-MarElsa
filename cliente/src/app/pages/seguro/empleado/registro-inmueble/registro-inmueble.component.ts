import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { Inmueble } from './../../../../modelo/inmueble';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { TipoInmueble } from './../../../../modelo/tipo_inmueble';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css']
})
export class RegistroInmuebleComponent implements OnInit {

  listaInmuebles: Inmueble[];
  listaTiposInmueble: TipoInmueble[];
  selectedInmueble: Inmueble = new Inmueble();
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private inmuebleServie: InmuebleService, private router: Router) { }

  ngOnInit() {
  }

  registrar() {

    if (this.selectedInmueble.direccion == null || this.selectedInmueble.area == null
      || this.selectedInmueble.valor == null || this.selectedInmueble.numeroHabitaciones == null
      || this.selectedInmueble.numeroBanios == null || this.selectedInmueble.pisos == null) {

    } else {
      // this.selectedInmueble.tipoInmueble = this.selectedTipoInmueble;
      this.selectedTipoInmueble.id = 1;
      this.selectedInmueble.tipoInmueble = this.selectedTipoInmueble;
      this.inmuebleServie.registrarInmueble(this.selectedInmueble)
      .subscribe(inmueble => {
        this.respuesta = JSON.parse(JSON.stringify(inmueble));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedInmueble.direccion);
        this.selectedInmueble = new Inmueble();
        this.selectedTipoInmueble = new TipoInmueble();
      });
    }
  }

  listarTiposInmueble() {
    this.inmuebleServie.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;
    });
  }

  buscar() {

    if (this.selectedInmueble.id == null) {

    } else {
      this.selectedInmueble.tipoInmueble = this.selectedTipoInmueble;
      this.selectedTipoInmueble.id = 1;
      this.inmuebleServie.buscarInmueble(this.selectedInmueble.id)
      .subscribe(customer => {
        this.selectedInmueble = JSON.parse(JSON.stringify(customer));
        console.log(JSON.parse(JSON.stringify(customer)));
        console.log(this.selectedInmueble.direccion + ' SEARCH');
      });
    }
  }

}
