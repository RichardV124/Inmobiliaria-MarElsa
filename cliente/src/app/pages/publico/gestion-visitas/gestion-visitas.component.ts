import { LoginService } from 'src/app/services/login/login.service';
import { Login } from 'src/app/modelo/login';
import { Visita } from './../../../modelo/visita';
import { Persona } from './../../../modelo/persona';
import { Municipio } from './../../../modelo/municipio';
import { Departamento } from './../../../modelo/departamento';
import { TipoInmueble } from 'src/app/modelo/tipo_inmueble';
import { Archivo } from './../../../modelo/archivo';
import { RespuestaDTO } from './../../../modelo/respuestaDTO';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { Inmueble } from 'src/app/modelo/inmueble';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MunicipioService } from 'src/app/services/municipio/municipio.service';
import { ScrollHelper } from 'src/app/modelo/ScrollHelper';
import { VisitaService } from 'src/app/services/visita/visita.service';

 @Component({
   selector: 'app-gestion-visitas',
   templateUrl: './gestion-visitas.component.html',
   styleUrls: ['./gestion-visitas.component.css']
 })
export class GestionVisitasComponent implements OnInit, AfterViewChecked {

  inmueble;
  selectedInmueble: Inmueble;
  respuesta: RespuestaDTO = new RespuestaDTO();
  archivo: Archivo = new Archivo();
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  selectedDepartamento: Departamento = new Departamento();
  selectedMunicipio: Municipio = new Municipio();
  propietario: Persona = new Persona();
  selectedVisita: Visita = new Visita();
  dateToday: string;
  obtuvoDatosCombosBusqueda = false;
  publicarEnArriendo: boolean;
   publicarEnVenta: boolean;
   listaMunicipios: Municipio[];
   listaTiposInmueble: TipoInmueble[];
   listaDepartamentos: Departamento[];
   visitasSinConfirmar: Visita[];
   visitasConfirmadas: Visita[];
   latitudDefecto = 4.540130;
   longitudDefecto = -75.665193;
  show = 0;
  inmuebleBuscado = false;
  boolBuscarInmueble = false;
  mostrarTabArchivos = false;
   marcadorAgregado = false;
   private scrollHelper: ScrollHelper = new ScrollHelper();
   user: Login = new Login();


  constructor(
    private inmuebleService: InmuebleService,
    private municipioService: MunicipioService,
    private visitaService: VisitaService,
    private servicios: LoginService

  ) {
     this.inmueble = JSON.parse( localStorage.getItem('inmueble'));
     this.user = JSON.parse( localStorage.getItem('usuario'));
     this.selectedInmueble = this.inmueble;
     this.buscarInmueble();
     this.listarDepartamentos();
    this.listarTiposInmueble();
    this.listarMunicipios();
    this.llenarTablas();
    this.scrollHelper.scrollToFirst('section_subtitle');
   }

  ngOnInit() {
     this.servicios.esAccesible('gestion-visitas-cliente');
     this.user = this.servicios.getUsuario();
  }

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }

  onChoseLocation(event) {
    this.selectedInmueble.latitud = event.coords.lat;
    this.selectedInmueble.longitud = event.coords.lng;
    this.marcadorAgregado = true;
  }

  cerrarMsj() {
    this.show = 0;
  }


  buscarInmueble() {
    this.inmuebleService.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'No se encuentra ningun inmueble';
          this.show = 1;
           this.boolBuscarInmueble = false;
           this.inmuebleBuscado = false;
        } else {
           this.marcadorAgregado = true;
           this.mostrarTabArchivos = false;
           this.selectedInmueble = inmueble;
           this.listarArchivos();
           this.obtenerDatosCombosBusqueda();
           this.obtenerPublicacionInmueble();
           this.respuesta.msj = 'Despliegue los datos del inmueble';
           this.show = 2;
           this.inmuebleBuscado = true;
        }
      });
  }

  listarArchivos() {
    this.inmuebleService.listarArchivos(this.selectedInmueble.id)
    .subscribe(archivo => {
      this.archivo = archivo;
      return true;
    });
  }

  obtenerDatosCombosBusqueda() {

    // Se obtienen los datos del tipo de inmueble
    const idTipo = this.obtenerDatosJSON('tipo_inmueble_id', this.selectedInmueble);
    // Se asigna los datos obtenidos al tipo inmueble
    this.selectedTipoInmueble.id = idTipo;

    // Se obtienen el id del departamento
   const idDepto = this.obtenerDatosJSON('id_depto', this.selectedInmueble);
    // Se asignan los datos obtenidos al departamento
    this.selectedDepartamento.id = 1;
    this.listarMunicipios();

    // Se obtienen el id del municipio
    const idMunicipio = this.obtenerDatosJSON('municipio_id', this.selectedInmueble);
    // Se asignan los datos obtenidos al municipio
    this.selectedMunicipio.id = idMunicipio;

    // Obtenemos la cédula del cliente
    const cedulaCliente = this.obtenerDatosJSON('cliente_cedula', this.selectedInmueble);
    // Se asigna la cédula al propietario
    this.propietario.cedula = cedulaCliente;
    this.obtuvoDatosCombosBusqueda = true;

  }

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

  obtenerDatosJSON(atributo: string, inmueble: Inmueble) {
    return JSON.parse(JSON.stringify(inmueble[atributo]));
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }

  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  listarTiposInmueble() {
    this.inmuebleService.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;

    });
  }

  registrar() {
    // validamos los campos
    if (this.validarCampos() === false) {
      this.respuesta.msj = 'Debe ingresar todos los campos obligatorios y/o revisar la fecha';
      this.show = 1;
    } else {
      if (this.validarFechaAndHora() === false) {
        this.respuesta.msj = 'Ya tiene una visita solicitada para esta día en esta fecha';
        this.show = 1;
      } else {
        // Asignamos el estado inicial de la visita, siendo 0 Solicitada
        this.selectedVisita.estado = 0;
        // Asignamos el tipo de visita, en este caso es por defecto una solicitud de registro de inmueble
        if (this.selectedVisita.tipo_visita === '1') {
          this.selectedVisita.tipo_visita = 'tipo venta';
        } else {
          this.selectedVisita.tipo_visita = 'tipo arriendo';
        }
        // le asignamos el cliente a la visita
        this.selectedVisita.cliente_cedula = this.user.persona_cedula;
        // le asignamos el inmueble a la visita
        this.selectedVisita.inmueble_id = this.selectedInmueble;
        // le asiganamos el usuario a la visita
        this.selectedVisita.cliente_cedula = this.user.persona_cedula;
        // llamamos el servicio de registro de visita del cliente
        this.visitaService.registrarSolicitarVisitaCliente(this.selectedVisita)
                .subscribe(res => {
                  this.respuesta = JSON.parse(JSON.stringify(res));
                  console.log(this.respuesta.msj + ' SAVE ');
                  this.selectedVisita = new Visita();
                  // verificamos si la respuesta del servicio es positiva o negativa
                  if (this.respuesta.id === 404) {
                    this.show = 1;
                  } else {
                    this.show = 2;
                    this.llenarTablas();
                  }
        });
      } // else raro
    }
  }

  validarCampos(): boolean {
    if (this.selectedVisita.descripcion == null || this.selectedVisita.fecha == null
      || this.selectedVisita.hora === 0 || new Date(this.selectedVisita.fecha) <= new Date(this.dateToday)
      || this.selectedVisita.cliente_cedula == null || this.selectedVisita.tipo_visita === 'Seleccione una opcion'
      || this.selectedVisita.comentarios == null) {
        return true;
    }
    return false;
  }
  // || new Date(this.selectedVisita.fecha) <= new Date(this.dateToday)

  validarFechaAndHora (): boolean {
    let bandera = true;
    for (const visita of this.visitasSinConfirmar) {
      if (this.selectedVisita.fecha === visita.fecha && visita.hora === this.selectedVisita.hora) {
        bandera = false;
      }
    }
    for (const visit of this.visitasConfirmadas) {
      if (this.selectedVisita.fecha === visit.fecha && visit.hora === this.selectedVisita.hora) {
          bandera = false;
      }
    }

    // console.log('Huston, poseemos problemas!');
    if (bandera === true) {
      console.log('BANDERA TRUE!!');
      return true;
    } else {
      console.log('BANDERA FALSE!');
      return false;
    }
  }

  llenarTablas () {
    if (this.user !== null) {
    this.visitaService.listarVisitasPorClienteAndEstado(this.user.persona_cedula.cedula, 0)
              .subscribe(res => {
                for (const visita of res) {
                  visita.fecha = this.visitaService.formatoFecha(visita.fecha);
                }
                this.visitasSinConfirmar = res;
      });

    this.visitaService.listarVisitasPorClienteAndEstado(this.user.persona_cedula.cedula, 1)
        .subscribe(res => {
          for (const visit of res) {
            visit.fecha = this.visitaService.formatoFecha(visit.fecha);
          }
          this.visitasConfirmadas = res;
      });
    }
  }

  ver() {
    if (this.selectedVisita.tipo_visita === '1') {
        this.selectedVisita.tipo_visita = 'tipo venta';
    } else {
      this.selectedVisita.tipo_visita = 'tipo arriendo';
    }
    this.selectedVisita.inmueble_id = this.selectedInmueble;
    this.selectedVisita.cliente_cedula = this.user.persona_cedula;
    console.log(this.selectedVisita);
  }

  validarHora() {

  }
}

