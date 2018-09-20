import { MunicipioService } from './../../../../services/municipio/municipio.service';
import { Departamento } from './../../../../modelo/departamento';
import { Municipio } from './../../../../modelo/municipio';
import { element } from 'protractor';
import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { Inmueble } from './../../../../modelo/inmueble';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { TipoInmueble } from './../../../../modelo/tipo_inmueble';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css'],
})
export class RegistroInmuebleComponent implements OnInit {

  listaInmuebles: Inmueble[];
  listaTiposInmueble: TipoInmueble[];
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  selectedInmueble: Inmueble = new Inmueble();
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  respuesta: RespuestaDTO = new RespuestaDTO();
  selectedFile: File = null;
  attachmentList: any = [];

  constructor(private inmuebleServie: InmuebleService,
    private municipioService: MunicipioService, private router: Router) {
    this.listarTiposInmueble();
    this.listarDepartamentos();
    this.selectedTipoInmueble.id = 0;
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
    this.selectedInmueble.municipio_id = this.selectedMunicipio;

   }

  ngOnInit() {
  }


  registrar() {

    if (this.selectedInmueble.direccion == null || this.selectedInmueble.area == null
      || this.selectedInmueble.valor == null || this.selectedInmueble.num_habitaciones == null
      || this.selectedInmueble.num_banios == null || this.selectedInmueble.pisos == null) {

    } else {
      this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
      this.selectedInmueble.municipio_id = this.selectedMunicipio;
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
  }

  listarTiposInmueble() {
    this.inmuebleServie.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;
      console.log(tipoInmueble);
    });
  }

  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  listarMunicipios() {
    this.selectedMunicipio.id = 0;
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
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
