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
    this.convertirBoolean();
    this.inmuebleServie.registrarInmueble(this.selectedInmueble)
    .subscribe(inmueble => {
      this.respuesta = JSON.parse(JSON.stringify(inmueble));
      this.combosPorDefecto();
      this.show = this.respuesta.id;

      if (this.show === 505) {
        this.buscar();
        this.crearArchivo();
      }

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
      archivoIngresado.inmueble_id = this.selectedInmueble;
      if (imgn) {
        archivoIngresado.archivo = 'imagen';
      } else {
        archivoIngresado.archivo = 'video';
      }
      this.inmuebleServie.registrarArchivo(archivoIngresado)
      .subscribe(res => {
        this.selectedInmueble = new Inmueble();
        this.propietario = new Persona();
      });
    };
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
      const idMun = this.obtenerDatosJSON('municipio_id', inmueble);
      const nomMun = this.obtenerDatosJSON('municipio', inmueble);
      const idDepto = this.obtenerDatosJSON('dpto_id', inmueble);
      const nomDepto = this.obtenerDatosJSON('depto', inmueble);

      const depto: Departamento = new Departamento();
      depto.id = idDepto;
      depto.nombre = nomDepto;

      const municipio: Municipio = new Municipio();
      municipio.id = idMun;
      municipio.nombre = nomMun;
      municipio.departamento_id = depto;

      inmueble.municipio_id = municipio;

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
   * Lista los archivos de un inmueble (Fotos y/o videos)
   */
  listarArchivos() {
    this.inmuebleServie.listarArchivos(this.selectedInmueble.id)
    .subscribe(archivo => {
      this.archivo = archivo;
      const file = this.archivo[0];
      console.log(atob(file.nombre[0]));
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
    const idTipo = this.obtenerDatosJSON('tipo_inmueble_id', this.selectedInmueble);
    // Se asigna los datos obtenidos al tipo inmueble
    this.selectedTipoInmueble.id = idTipo;

    // Se obtienen el id del departamento
    const idDepto = this.obtenerDatosJSON('id_depto', this.selectedInmueble);
    // Se asignan los datos obtenidos al departamento
    this.selectedDepartamento.id = idDepto;
    this.listarMunicipios();

    // Se obtienen el id del municipio
    const idMunicipio = this.obtenerDatosJSON('municipio_id', this.selectedInmueble);
    // Se asignan los datos obtenidos al municipio
    this.selectedMunicipio.id = idMunicipio;

    // Obtenemos la cédula del cliente
    const cedulaCliente = this.obtenerDatosJSON('cliente_cedula', this.selectedInmueble);
    // Se asigna la cédula al propietario
    this.propietario.cedula = cedulaCliente;

  }

  /**
   * Obtiene los datos de la cadena json retornada en la busqueda del inmueble
   * @param atributo nombre del campo en la consulta obtenida
   */
  obtenerDatosJSON(atributo: string, inmueble: Inmueble) {
    return JSON.parse(JSON.stringify(inmueble[atributo]));
  }

  /**
   * Elimina un inmubele de la base de datos
   * @param inmueble inmueble que se desea eliminar
   */
  eliminar(inmueble: Inmueble) {
    this.inmuebleServie.eliminarInmueble(inmueble)
    .subscribe(res => {
      this.respuesta = JSON.parse(JSON.stringify(res));
      this.show = this.respuesta.id;
      this.listarInmuebles();
    });
  }

  editar() {
    if (this.selectedInmueble.id == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe buscar un inmueble previamente';
    } else {
      this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
      this.selectedInmueble.municipio_id = this.selectedMunicipio;
      this.selectedInmueble.persona_cedula = this.usuario;
      this.selectedInmueble.cliente_cedula = this.propietario;
      this.convertirBoolean();
    this.inmuebleServie.editar(this.selectedInmueble)
    .subscribe(inmueble => {
      this.respuesta = JSON.parse(JSON.stringify(inmueble));
      this.selectedInmueble = new Inmueble();
      this.propietario = new Persona();
      this.combosPorDefecto();
      this.show = this.respuesta.id;
      this.listarInmuebles();
    });
    this.listarInmuebles();
    }
  }

  ver(inmueble: Inmueble) {
    this.selectedInmueble.matricula = inmueble.matricula;
    this.buscar();
  }

  /**
   * Busca un inmueble en la bd por su matrícula
   */
  buscar() {

    if (this.selectedInmueble.matricula == null) {
      this.respuesta.msj = 'Debe ingresar la matrícula del inmueble';
      this.show = 404;
    } else {
      this.inmuebleServie.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'El inmueble no existe';
          this.show = 404;
        } else {
          this.selectedInmueble = inmueble;
          this.listarArchivos();
          this.obtenerDatosCombosBusqueda();
        }
      });
    }
  }

  convertirBoolean() {

    if (!this.selectedInmueble.cocina_integral) {
      this.selectedInmueble.cocina_integral = null;
    }
    if (!this.selectedInmueble.zonas_verdes) {
      this.selectedInmueble.zonas_verdes = null;
    }
    if (!this.selectedInmueble.alarma) {
      this.selectedInmueble.alarma = null;
    }
    if (!this.selectedInmueble.gas) {
      this.selectedInmueble.gas = null;
    }
    if (!this.selectedInmueble.terraza) {
      this.selectedInmueble.terraza = null;
    }
    if (!this.selectedInmueble.sauna) {
      this.selectedInmueble.sauna = null;
    }
    if (!this.selectedInmueble.conjunto_cerrado) {
      this.selectedInmueble.conjunto_cerrado = null;
    }
    if (!this.selectedInmueble.seguridad) {
      this.selectedInmueble.seguridad = null;
    }
    if (!this.selectedInmueble.energia) {
      this.selectedInmueble.energia = null;
    }
    if (!this.selectedInmueble.precio_negociable) {
      this.selectedInmueble.precio_negociable = null;
    }
    if (!this.selectedInmueble.balcon) {
      this.selectedInmueble.balcon = null;
    }
    if (!this.selectedInmueble.zonabbq) {
      this.selectedInmueble.zonabbq = null;
    }
    if (!this.selectedInmueble.salon_comunal) {
      this.selectedInmueble.salon_comunal = null;
    }
    if (!this.selectedInmueble.zona_para_ninios) {
      this.selectedInmueble.zona_para_ninios = null;
    }
    if (!this.selectedInmueble.alcantarillado) {
      this.selectedInmueble.alcantarillado = null;
    }
    if (!this.selectedInmueble.gimnasio) {
      this.selectedInmueble.gimnasio = null;
    }
    if (!this.selectedInmueble.piscina) {
      this.selectedInmueble.piscina = null;
    }

  }

}
