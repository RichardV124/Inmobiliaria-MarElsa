import { Archivo } from './../../../../modelo/archivo';
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
import { Login } from '../../../../modelo/login';
import { LoginService } from '../../../../services/login/login.service';
import { Persona } from '../../../../modelo/persona';
import { PersonaService } from '../../../../services/persona/persona.service';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css'],
})
export class RegistroInmuebleComponent implements OnInit {

  show = 0;

  listaInmuebles: Inmueble[];
  listaTiposInmueble: TipoInmueble[];
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  selectedInmueble: Inmueble = new Inmueble();
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  respuesta: RespuestaDTO = new RespuestaDTO();
  selectedFile: File[] = null;
  attachmentList: any = [];
  usuario: Login = new Login();
  propietario: Persona = new Persona();
  archivo: Archivo = new Archivo();

  constructor(private inmuebleServie: InmuebleService, private servicios: LoginService,
    private municipioService: MunicipioService, private personaService: PersonaService,
    private router: Router) {
    this.listarTiposInmueble();
    this.listarDepartamentos();
    this.listarInmuebles();
    this.combosPorDefecto();
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
    this.selectedInmueble.municipio_id = this.selectedMunicipio;
   }

  ngOnInit() {
    this.servicios.esAccesible('registro-inmueble');
    this.usuario = this.servicios.getUsuario();
    console.log(this.usuario);
  }

  /** validarCamposNumericosNegativos() {
    if (this.selectedInmueble.garaje < 0 || this.selectedInmueble.num_closets < 0
      || this.selectedInmueble.num_cocinas < 0 || this.selectedInmueble.area < 0
      || this.selectedInmueble.valor < 0
      || this.selectedInmueble.num_habitaciones < 0 || this.selectedInmueble.num_banios < 0
      || this.selectedInmueble.pisos < 0) {
        return false;
      }
      return true;
  }

  validarCamposNumericos() {
    if (this.selectedInmueble.area < 1 || this.selectedInmueble.valor < 1
      || this.selectedInmueble.num_habitaciones < 1 || this.selectedInmueble.num_banios < 1
      || this.selectedInmueble.pisos < 1) {
      return false;
    }
    return true;
  } **/

  validarCamposVacios() {
    if (this.selectedMunicipio.id === 0 || this.selectedDepartamento.id === 0
        || this.selectedInmueble.zona === 0) {
        return false;
      }
      return true;
  }

  /**
   * Si los campos que no son obligatorios no son ingresados, se
   * les asigna el valor 0
   */
  validarCamposNoIngresados() {
    if (this.selectedInmueble.promocion == null) {
      this.selectedInmueble.promocion = 0;
    }
    if (this.selectedInmueble.garaje == null) {
      this.selectedInmueble.garaje = 0;
    }
    if (this.selectedInmueble.num_closets == null) {
      this.selectedInmueble.num_closets = 0;
    }
  }

  registrar() {

    this.validarCamposNoIngresados();
      if (!this.validarCamposVacios()) {
      this.respuesta.msj = 'Debe ingresar los campos obligatorios';
      this.show = 1;
      this.clienteExiste();
    // } else if (!this.clienteExiste()) {
      // this.respuesta.msj = 'La cédula del cliente ingresado no existe';
      // this.show = 1;
    } else {
      this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
      this.selectedInmueble.municipio_id = this.selectedMunicipio;
      this.selectedInmueble.persona_cedula = this.usuario;
      this.selectedInmueble.cliente_cedula = this.propietario;
      this.inmuebleServie.registrarInmueble(this.selectedInmueble)
      .subscribe(inmueble => {
        this.respuesta = JSON.parse(JSON.stringify(inmueble));
        console.log(this.respuesta.msj + ' SAVE');
        console.log(this.selectedInmueble);
        this.selectedInmueble = new Inmueble();
        this.combosPorDefecto();
        this.show = 2;
        this.listarInmuebles();
      });
     }
  }

  /**
   * Verifica si la cédula del cliente que el empleado ingresó, existe
   */
  clienteExiste() {
    this.personaService.buscarPersona(this.propietario.cedula)
    .subscribe(cliente => {
      this.propietario = JSON.parse(JSON.stringify(cliente));
      console.log('nombre cliente: ' + this.propietario.nombre);
      if (this.propietario.nombre != null) {
        return true;
      }
    });
    return false;
  }

  /**
   * llena el valor de los combos por defecto
   */
  combosPorDefecto() {
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedInmueble.zona = 0;
    this.selectedTipoInmueble.id = 0;
  }

/**
   * Para agregar un archivo
   * @param event archivo seleccionado
   */
  onFileSelected(event) {
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }

  addFile() {
    // console.log('guardando foto ' + this.selectedFile.name);
  }

  listarInmuebles() {
    this.inmuebleServie.listarInmuebles()
    .subscribe(inmueble => {
      this.listaInmuebles = inmueble;
      this.obtenerDatosCombosLista();
    });
  }

  /**
   * Obtiene los datos que se registraron en los cambos para llenarlos en la lista
   */
  obtenerDatosCombosLista() {
    // tslint:disable-next-line:prefer-const
    for (let inmueble of this.listaInmuebles) {
      this.inmuebleServie.buscarTipoInmuebleId(JSON.parse(JSON.stringify(inmueble['tipo_inmueble_id'])))
      .subscribe(tipo => {
        inmueble.tipo_inmueble_id = JSON.parse(JSON.stringify(tipo));
      });
    }
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
      .subscribe(inmueble => {
        this.selectedInmueble = JSON.parse(JSON.stringify(inmueble));
        console.log(JSON.parse(JSON.stringify(inmueble)));
        console.log(this.selectedInmueble.direccion + ' SEARCH');
      });
    }
  }

}
