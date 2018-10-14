import { VentasService } from './../../../../services/ventas/ventas.service';
import { ArriendosService } from './../../../../services/arriendos/arriendos.service';
import { Venta } from './../../../../modelo/venta';
import { Arriendo } from './../../../../modelo/arriendo';
import { ClienteService } from './../../../../services/cliente/cliente.service';
import { Archivo } from './../../../../modelo/archivo';
import { MunicipioService } from './../../../../services/municipio/municipio.service';
import { Departamento } from './../../../../modelo/departamento';
import { Municipio } from './../../../../modelo/municipio';
import { element, $ } from 'protractor';
import { RespuestaDTO } from './../../../../modelo/respuestaDTO';
import { Inmueble } from './../../../../modelo/inmueble';
import { InmuebleService } from './../../../../services/inmueble/inmueble.service';
import { TipoInmueble } from './../../../../modelo/tipo_inmueble';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../../modelo/login';
import { LoginService } from '../../../../services/login/login.service';
import { Persona } from '../../../../modelo/persona';
import { Rol } from '../../../../modelo/rol';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-registro-inmueble',
  templateUrl: './registro-inmueble.component.html',
  styleUrls: ['./registro-inmueble.component.css'],
})
export class RegistroInmuebleComponent implements OnInit {


/* variables de validacion */

listarInmuebless = false;
boolBuscarInmueble = false;
clientExist = false;


  img;
  show = 0;
  rol: Rol = new Rol();
  labelFile;
  mostrarTabArchivos = false;
  latitudDefecto = 4.540130;
  longitudDefecto = -75.665193;
  verInmueble = false;
  marcadorAgregado = false;

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
  publicarEnArriendo: boolean;
  publicarEnVenta: boolean;

  constructor(private inmuebleServie: InmuebleService, private servicios: LoginService,
    private municipioService: MunicipioService, private personaService: ClienteService,
    private router: Router, private arriendoService: ArriendosService,
    private ventaService: VentasService) {
    this.listarTiposInmueble();
    this.listarDepartamentos();
    this.listarInmuebles();
    this.combosPorDefecto();
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
    this.selectedInmueble.municipio_id = this.selectedMunicipio;
    this.labelFile = 'Ningún archivo seleccionado';
   }

  ngOnInit() {
    this.servicios.esAccesible('registro-inmueble');
    this.usuario = this.servicios.getUsuario();
  }

  /**
   * Cierra el msj emergente
   */
  cerrarMsj() {
    this.show = 0;
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
    return true;
  }

  onChoseLocation(event) {
    this.selectedInmueble.latitud = event.coords.lat;
    this.selectedInmueble.longitud = event.coords.lng;
    this.marcadorAgregado = true;
  }

  /**
   * Verifica los datos ingresados para realizar el registro
   */
  registrar() {

    this.validarCamposNoIngresados();
      if (!this.validarCamposVacios()) {
      this.respuesta.msj = 'Debe ingresar los campos obligatorios';
      this.show = 404;
      } else if (this.validarUbicacionInmueble()) {
        if (this.tipoDePublicacionSeleccionado()) {
         if (this.archivosAgregados()) {
          this.clienteExiste();
         }
       }
      }
  }

  validarUbicacionInmueble() {
    if (!this.marcadorAgregado) {
        this.respuesta.msj = 'Debe agregar la ubicación del inmueble';
        this.show = 404;
        return false;
    }
    return true;
  }

  /**
   * Verifica si se seleccionó por lo menos un archivo
   */
  archivosAgregados() {
    if (this.selectedFile === null) {
      this.respuesta.msj = 'Debe agregar por lo menos un archivo';
      this.show = 404;
      return false;
    }
    return true;
  }

  /**
   * Verifica si se seleccionó por lo menos una opción de publicación
   */
  tipoDePublicacionSeleccionado() {
    if (!this.publicarEnArriendo && !this.publicarEnVenta) {
      this.respuesta.msj = 'Debe seleccionar por lo menos una de las '
      + ' opciones de publicación (arriendo y/o venta)';
      this.show = 404;
      return false;
    }
    return true;
  }

  /**
   * Realiza el registro en la base de datos cuando
   */
  continuarRegistro() {
    this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
    this.selectedInmueble.municipio_id = this.selectedMunicipio;
    this.selectedInmueble.persona_cedula = this.usuario;
    this.selectedInmueble.cliente_cedula = this.propietario;
    this.verificarTipoPublicacion();
    this.convertirBoolean();
    this.inmuebleServie.registrarInmueble(this.selectedInmueble)
    .subscribe(inmueble => {
      this.respuesta = JSON.parse(JSON.stringify(inmueble));
      this.show = this.respuesta.id;

      if (this.show === 505) {
        this.obtenerIdInmuebleRegistrado();
      }

      this.listarInmuebles();
      return true;
    });
  }

  /**
   * Obtiene el id del inmueble que se registró
   */
  obtenerIdInmuebleRegistrado() {
    this.inmuebleServie.buscarInmueble(this.selectedInmueble.matricula)
    .subscribe (inmueble => {
      if (inmueble !== undefined) {
        this.crearArchivo(inmueble);
      }
    });
  }

  verificarTipoPublicacion() {
    if (this.publicarEnArriendo && this.publicarEnVenta) {
      this.selectedInmueble.publicacion = 3;
    } else if (this.publicarEnArriendo) {
      this.selectedInmueble.publicacion = 1;
    } else if (this.publicarEnVenta) {
      this.selectedInmueble.publicacion = 2;
  }

  }

  /**
   * Verifica si la cédula del cliente que el empleado ingresó, existe
   */
  clienteExiste() {
    this.personaService.buscarPersona(this.propietario.cedula)
    .subscribe(cliente => {
      if (cliente !== undefined) {
        this.clientExist = true;
        this.continuarRegistro();
        this.propietario = cliente;
      } else {
        this.respuesta.msj = 'La cédula del cliente ingresado no existe';
        this.show = 404;
        this.clientExist = false;
      }
    });
  }

  limpiarCampos() {
    this.combosPorDefecto();
    this.propietario = new Persona();
    this.selectedInmueble = new Inmueble();
    this.selectedInmueble.zona = 0;
    this.publicarEnArriendo = false;
    this.publicarEnVenta = false;
    this.selectedFile = [];
    this.mostrarTabArchivos = false;
    this.labelFile = 'Ningún archivo seleccionado';
    this.verInmueble = false;
    this.marcadorAgregado = false;
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

    if (this.selectedFile === null) {
      this.labelFile = 'Ningún archivo seleccionado';
    } else {
    this.labelFile = '';
    for (const file of this.selectedFile) {
      this.labelFile = this.labelFile + '  ' + file.name;
    }

    /** this.selectedFile = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
        this.selectedFile = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]); **/

   }
  }

  mostrarFotos() {
    return this.mostrarTabArchivos;
  }

  /**
   * Obtiene la lista de inmuebles registrados en la bd
   */
  listarInmuebles() {
    this.inmuebleServie.listarInmuebles()
    .subscribe(inmueble => {
      this.listaInmuebles = inmueble;
      if (this.listaInmuebles === undefined) {
        this.listarInmuebless = false;
      } else {
        this.listarInmuebless = true;
      }
      this.obtenerDatosCombosLista();
    });
  }

  crearArchivo(inmueble: Inmueble) {
    for (const file of this.selectedFile) {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
      if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
        this.convertirArchivoBase64(file, true, inmueble);
      } else if (ext === 'mp4') {
        this.convertirArchivoBase64(file, false, inmueble);
      } else {
        this.show = 404;
        this.respuesta.msj = 'El archivo ' + file.name + ' tiene una extensión no permitida';
      }
    }
    this.limpiarCampos();
  }

  convertirArchivoBase64(file: File, imgn: boolean, inmueble: Inmueble) {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.img = myReader.result;
      const archivoIngresado: Archivo = new Archivo();
      archivoIngresado.nombre = this.img;
      archivoIngresado.inmueble_id = inmueble;
      if (imgn) {
        archivoIngresado.archivo = 'imagen';
      } else {
        archivoIngresado.archivo = 'video';
      }
      this.inmuebleServie.registrarArchivo(archivoIngresado)
      .subscribe(res => {
        // registrado
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
      return true;
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
      this.limpiarCampos();
    });
    return true;
  }

  editar() {
    if (this.selectedInmueble.id == null) {
      this.show = 404;
      this.respuesta.msj = 'Debe buscar un inmueble previamente';
    } else {
      if (this.validarUbicacionInmueble()) {
      if (this.tipoDePublicacionSeleccionado()) {
        if (this.archivosAgregados()) {
         this.selectedInmueble.tipo_inmueble_id = this.selectedTipoInmueble;
         this.selectedInmueble.municipio_id = this.selectedMunicipio;
         this.selectedInmueble.persona_cedula = this.usuario;
         this.selectedInmueble.cliente_cedula = this.propietario;
         this.verificarTipoPublicacion();
         this.convertirBoolean();
         this.inmuebleServie.editar(this.selectedInmueble)
        .subscribe(inmueble => {
          this.respuesta = JSON.parse(JSON.stringify(inmueble));
          this.show = this.respuesta.id;
          if (this.show === 505) {
            this.crearArchivo(this.selectedInmueble);
            this.listarInmuebles();
          }
        });
       }
      }
    }
    }
  }

  /**
   * Permite ver los datos de un inmueble
   * @param inmueble inmueble del cual se desea ver los datos
   */
  ver(inmueble: Inmueble) {
    this.limpiarCampos();
    this.selectedInmueble.matricula = inmueble.matricula;
    this.buscar();
    this.verInmueble = true;
    this.respuesta.msj = 'Despliegue el acordion de la parte superior para ver los datos del inmueble';
    this.show = 505;
  }

  /**
   * Obtiene los datos de la publicación del inmueble
   */
  obtenerPublicacionInmueble() {
    const publicacion = this.obtenerDatosJSON('publicacion', this.selectedInmueble);
    if (publicacion === 1) {
      this.publicarEnArriendo = true;
      this.publicarEnVenta = false;
    } else if (publicacion === 2) {
      this.publicarEnVenta = true;
      this.publicarEnArriendo = false;
    } else {
      this.publicarEnVenta = true;
      this.publicarEnArriendo = true;
    }
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
          this.boolBuscarInmueble = false;
          this.limpiarCampos();
        } else {
          this.marcadorAgregado = true;
          this.mostrarTabArchivos = false;
          this.selectedInmueble = inmueble;
          this.listarArchivos();
          this.obtenerDatosCombosBusqueda();
          this.obtenerPublicacionInmueble();
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
    return true;
  }


  validarListarInmuebles(): boolean {
    return this.listarInmuebless;
  }
  validarBuscarInmueble(): boolean {
    return this.boolBuscarInmueble;
  }
  validarClienteExist(): boolean {
    return this.clientExist;
  }
}
