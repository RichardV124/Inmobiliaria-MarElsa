import { element } from 'protractor';
import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { Inmueble } from './../../../../modelo/inmueble';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { TipoInmueble } from './../../../../modelo/tipo_inmueble';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Archivo } from '../../../../modelo/archivo';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css'],
})
export class RegistroInmuebleComponent implements OnInit {

  listaInmuebles: Inmueble[];
  listaTiposInmueble: TipoInmueble[];
  selectedInmueble: Inmueble = new Inmueble();
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  respuesta: RespuestaDTO = new RespuestaDTO();
  selectedFile: File = null;
  archivo: Archivo = new Archivo();
  attachmentList: any = [];

  constructor(private inmuebleServie: InmuebleService, private router: Router) {
    this.listarTiposInmueble();
    this.selectedTipoInmueble.id = 0;
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;

   }

  ngOnInit() {
  }


  registrar() {

    if (this.selectedInmueble.direccion == null || this.selectedInmueble.area == null
      || this.selectedInmueble.valor == null || this.selectedInmueble.num_habitaciones == null
      || this.selectedInmueble.num_banios == null || this.selectedInmueble.pisos == null) {

    } else {
      this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
      this.inmuebleServie.registrarInmueble(this.selectedInmueble)
      .subscribe(inmueble => {
        this.respuesta = JSON.parse(JSON.stringify(inmueble));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedInmueble);
        this.selectedInmueble = new Inmueble();
        this.selectedTipoInmueble.id = 0;
      });
    }
  }

/**
   * Para agregar un archivo
   * @param event archivo seleccionado
   */
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  addFile() {
    console.log('guardando foto ' + this.selectedFile.name);
    this.archivo.id = 1;
    this.archivo.archivo = this.selectedFile;
    this.inmuebleServie.addFile(this.archivo);
  }

  listarTiposInmueble() {
    this.inmuebleServie.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;
      console.log(tipoInmueble);
    });
  }

  buscar() {

    if (this.selectedInmueble.id == null) {

    } else {
      this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
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
