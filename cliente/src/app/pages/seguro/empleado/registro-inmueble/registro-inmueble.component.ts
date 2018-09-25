import { ClienteService } from './../../../../services/cliente/cliente.service';
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

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css'],
})
export class RegistroInmuebleComponent implements OnInit {

  img;
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
  usuario: Login = new Login();
  propietario: Persona = new Persona();
  archivo: Archivo = new Archivo();

  constructor(private inmuebleServie: InmuebleService, private servicios: LoginService,
    private municipioService: MunicipioService, private personaService: ClienteService,
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

  /**
   * Valida que se hayan ingresado los campos obligatorios
   */
  validarCamposVacios() {
    if (this.selectedMunicipio.id === 0 || this.selectedDepartamento.id === 0
        || this.selectedInmueble.zona === 0 || this.propietario.cedula == null
        || this.selectedInmueble.matricula == null || this.selectedInmueble.direccion == null
        || this.selectedInmueble.area == null || this.selectedInmueble.valor == null
        || this.selectedInmueble.num_habitaciones == null || this.selectedInmueble.num_banios == null
        || this.selectedInmueble.pisos == null || this.selectedInmueble.num_cocinas == null) {
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

  /**
   * Verifica los datos ingresados para realizar el registro
   */
  registrar() {

    this.validarCamposNoIngresados();
      if (!this.validarCamposVacios()) {
      this.respuesta.msj = 'Debe ingresar los campos obligatorios';
      this.show = 1;
      } else {
        this.clienteExiste();
      }
  }

  /**
   * Realiza el registro en la base de datos cuando
   */
  continuarRegistro() {
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
    this.selectedInmueble.municipio_id = this.selectedMunicipio;
    this.selectedInmueble.persona_cedula = this.usuario;
    this.selectedInmueble.cliente_cedula = this.propietario;
    this.inmuebleServie.registrarInmueble(this.selectedInmueble)
    .subscribe(inmueble => {
      this.respuesta = JSON.parse(JSON.stringify(inmueble));
      // console.log(this.respuesta.msj + ' SAVE');
      // console.log(this.selectedInmueble);
      this.selectedInmueble = new Inmueble();
      this.propietario = new Persona();
      this.combosPorDefecto();
      this.show = 2;
      this.listarInmuebles();
    });
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
        this.continuarRegistro();
      } else {
        this.respuesta.msj = 'La cédula del cliente ingresado no existe';
        this.show = 1;
      }
    });
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

  /**
   * Obtiene la lista de inmuebles registrados en la bd
   */
  listarInmuebles() {
    this.inmuebleServie.listarInmuebles()
    .subscribe(inmueble => {
      this.listaInmuebles = inmueble;
      this.obtenerDatosCombosLista();
    });
  }

  crearArchivo() {
    for (const file of this.selectedFile) {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
      if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
        this.convertirArchivoBase64(file, true);
      } else if (ext === 'mp4') {

      } else {
        this.show = 1;
        this.respuesta.msj = 'El archivo ' + file.name + ' tiene una extensión no permitida';
      }
    }
  }

  convertirArchivoBase64(file: File, imgn: boolean) {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.img = myReader.result;
      const archivoIngresado: Archivo = new Archivo();
      archivoIngresado.nombre = this.img;
      if (imgn) {
        archivoIngresado.archivo = 'imagen';
      } else {
        archivoIngresado.archivo = 'video';
      }
      this.inmuebleServie.registrarArchivo(archivoIngresado);
    }
    myReader.readAsDataURL(file);
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

  /**
   * Obtiene la lista de tipos de inmuebles
   */
  listarTiposInmueble() {
    this.inmuebleServie.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;
    });
  }

  /**
   * Obtiene la lista de departamentos
   */
  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  /**
   * Obtiene los muncipios de un departamento
   */
  listarMunicipios() {
    this.selectedMunicipio.id = 0;
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }

  /**
   * Obtiene los datos de los combos al buscar un inmubele
   */
  obtenerDatosCombosBusqueda() {
    // Se obtienen los datos del tipo de inmueble
    const idTipo = this.obtenerDatosJSON('tipo_inmueble_id');
    // Se asigna los datos obtenidos al tipo inmueble
    this.selectedTipoInmueble.id = idTipo;

    // Se obtienen el id del departamento
    const idDepto = this.obtenerDatosJSON('id_depto');
    // Se asignan los datos obtenidos al departamento
    this.selectedDepartamento.id = idDepto;
    this.listarMunicipios();

    // Se obtienen el id del municipio
    const idMunicipio = this.obtenerDatosJSON('municipio_id');
    // Se asignan los datos obtenidos al municipio
    this.selectedMunicipio.id = idMunicipio;

  }

  /**
   * Obtiene los datos de la cadena json retornada en la busqueda del inmueble
   * @param atributo nombre del campo en la consulta obtenida
   */
  obtenerDatosJSON(atributo: string) {
    return JSON.parse(JSON.stringify(this.selectedInmueble[atributo]));
  }

  /**
   * Elimina un inmubele de la base de datos
   * @param inmueble inmueble que se desea eliminar
   */
  eliminar(inmueble: Inmueble) {
    console.log(inmueble);
    this.inmuebleServie.eliminarInmueble(inmueble.id);
    this.listarInmuebles();
  }

  editar() {
    if (this.selectedInmueble.id == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe buscar un inmueble previamente';
    } else {
    this.inmuebleServie.editar(this.selectedInmueble);
    this.listarInmuebles();
    }
  }

  /**
   * Busca un inmueble en la bd por su matrícula
   */
  buscar() {

    if (this.selectedInmueble.matricula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe ingresar la matrícula del inmueble';
    } else {
      this.inmuebleServie.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        this.selectedInmueble = JSON.parse(JSON.stringify(inmueble));
        if (this.selectedInmueble.direccion == null) {
          this.show = 1;
          this.respuesta.msj = 'El inmueble no existe';
        } else {
          this.obtenerDatosCombosBusqueda();
        }
        console.log(JSON.parse(JSON.stringify(inmueble)));
        console.log(this.selectedInmueble.direccion + ' SEARCH');
      });
    }
  }

}
