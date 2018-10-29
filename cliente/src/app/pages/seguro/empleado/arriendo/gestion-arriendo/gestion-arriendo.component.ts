import { ArriendoDTO } from './../../../../../modelo/dto/arriendoDTO';
import { VentaDTO } from './../../../../../modelo/dto/VentaDTO';
import { VentasService } from './../../../../../services/ventas/ventas.service';
import { Visita } from './../../../../../modelo/visita';
import { Cliente } from './../../../../../modelo/cliente';
import { Arriendo } from './../../../../../modelo/arriendo';
import { TipoInmueble } from './../../../../../modelo/tipo_inmueble';
import { Archivo } from './../../../../../modelo/archivo';
import { InmuebleService } from './../../../../../services/inmueble/inmueble.service';
import { Departamento } from './../../../../../modelo/departamento';
import { MunicipioService } from './../../../../../services/municipio/municipio.service';
import { EmpleadoDTO } from './../../../../../modelo/dto/empleadoDTO';
import { EmpleadoService } from './../../../../../services/empleado/empleado.service';
import { Persona } from './../../../../../modelo/persona';
import { RespuestaDTO } from './../../../../../modelo/respuestaDTO';
import { Inmueble } from './../../../../../modelo/inmueble';
import { Login } from './../../../../../modelo/login';
import { ClienteService } from './../../../../../services/cliente/cliente.service';
import { LoginService } from './../../../../../services/login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArriendosService } from 'src/app/services/arriendos/arriendos.service';
import { Municipio } from 'src/app/modelo/municipio';
import { timingSafeEqual } from 'crypto';
import { loadDirective } from '@angular/core/src/render3/instructions';


@Component({
  selector: 'app-gestion-arriendo',
  templateUrl: './gestion-arriendo.component.html',
  styleUrls: ['./gestion-arriendo.component.css']
})
export class GestionArriendoComponent implements OnInit {

  constructor(
    // private inmuebleServie: ArriendosService,
    private inmuebleService: InmuebleService,
    private servicios: LoginService,
    private personaService: ClienteService,
    private clienteService: ClienteService,
    private empleadoService: EmpleadoService,
    private municipioService: MunicipioService,
    private router: Router,
    private ventaService: VentasService,
    private arriendoService: ArriendosService, ) {
    this.listarDepartamentos();
    this.listarTiposInmueble();
    this.listarArriendos();
    console.log(this.listarArriendos());

    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;

   }


  mostrarTabArchivos = false;
   marcadorAgregado = false;
   show = 0;
   publicarEnArriendo: boolean;
   publicarEnVenta: boolean;
   boolBuscarInmueble = false;
  Arriendo = false;
  labelFile;
  arrendado;

    usuario: Login = new Login();
    selectedLogin: Login = new Login();
    selectedInmueble: Inmueble = new Inmueble();
    selectedPersona: Persona = new Persona();
    respuesta: RespuestaDTO = new RespuestaDTO();
    empleadoDTO: EmpleadoDTO = new EmpleadoDTO();
    selectedDepartamento: Departamento = new Departamento();
    selectedMunicipio: Municipio = new Municipio();
    archivo: Archivo = new Archivo();
    selectedTipoInmueble: TipoInmueble = new TipoInmueble();
    propietario: Persona = new Persona();
    selectedArriendo: Arriendo = new Arriendo();
    selectedVisita: Visita = new Visita();
    arriendoDTO: ArriendoDTO = new ArriendoDTO();

    listaMunicipios: Municipio[];
    listaDepartamentos: Departamento[];
    listaTiposInmueble: TipoInmueble[];
    listaArriendos: Arriendo[];
    selectedFile: File[] = null;

   ngOnInit() {
    this.servicios.esAccesible('registro-arriendo');
    this.usuario = this.servicios.getUsuario();
  }

  cerrarMsj() {
    this.show = 0;
  }

  registrarArriendo() {
    this.selectedArriendo.cliente_cedula = this.selectedPersona.cedula;
    this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
    this.selectedArriendo.inmueble_id = this.selectedInmueble;

    if ( this.selectedPersona.cedula == null || this.selectedInmueble.matricula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe buscar el cliente y el inmuble';
      this.limpiarCamposArrendo();
    } else {
      this.arriendoService.searchVisita(this.selectedPersona.cedula, this.selectedInmueble.id ).subscribe(visita => {
        this.selectedVisita = visita;
        this.selectedArriendo.visita_id = this.selectedVisita;
        this.arriendoService.registrarInmubeleArriendo(this.selectedArriendo).subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        this.show = 2;
        this.respuesta.msj = 'Se registro el arriendo correctamente';
        this.listarArriendos();
        this.limpiarCamposArrendo();
    });
  });
    }


  }
  registrarArriendo2() {
    this.selectedArriendo.cliente_cedula = this.selectedPersona.cedula;
    this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
    this.selectedArriendo.inmueble_id = this.selectedInmueble;

    if ( this.selectedPersona.cedula == null || this.selectedInmueble.matricula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe buscar el cliente y el inmuble';
      this.limpiarCamposArrendo();
    } else {
      this.arriendoService.buscarInmuebleArrendado(this.selectedInmueble.id).subscribe(arr => {
        if (arr === undefined) {
            this.arriendoService.searchVisita(this.selectedPersona.cedula, this.selectedInmueble.id ).subscribe(visita => {
            this.selectedVisita = visita;
            this.selectedArriendo.visita_id = this.selectedVisita;
            this.arriendoService.registrarInmubeleArriendo(this.selectedArriendo).subscribe(res => {
            this.respuesta = JSON.parse(JSON.stringify(res));
            this.show = 2;
            this.respuesta.msj = 'Se registro el arriendo correctamente';
            this.listarArriendos();
            this.limpiarCamposArrendo();
        });
      });

        } else {
          this.show = 404;
          this.respuesta.msj = 'Ingrese otro ilmueble, este ya se encuentra arrendado';
          alert('Ingrese otro ilmueble, este ya se encuentra arrendado');
          this.limpiarCamposArrendo();
        }

      });
    }


  }

  registrarArriendo3() {
    this.selectedArriendo.cliente_cedula = this.selectedPersona.cedula;
    this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
    this.selectedArriendo.inmueble_id = this.selectedInmueble;

    if ( this.selectedPersona.cedula == null || this.selectedInmueble.matricula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe buscar el cliente y el inmuble';
      this.limpiarCamposArrendo();
    } else {
      this.arriendoService.buscarInmuebleArrendado(this.selectedInmueble.id).subscribe(arr => {
        this.ventaService.buscarInmuebleVenta(this.selectedInmueble.id).subscribe(arrven => {
        if (arr === undefined) {
          if (arrven === undefined) {
            this.arriendoService.searchVisita(this.selectedPersona.cedula, this.selectedInmueble.id ).subscribe(visita => {
              this.selectedVisita = visita;
              this.selectedArriendo.visita_id = this.selectedVisita;
              this.arriendoService.registrarInmubeleArriendo(this.selectedArriendo).subscribe(res => {
              this.respuesta = JSON.parse(JSON.stringify(res));
              this.show = 2;
              this.respuesta.msj = 'Se registro el arriendo correctamente';
              this.listarArriendos();
              this.limpiarCamposArrendo();
          });
        });

          } else {
            this.show = 404;
          this.respuesta.msj = 'Ingrese otro ilmueble, este ya se encuentra vendido';
          alert('Ingrese otro ilmueble, este ya se encuentra vendido');
          this.limpiarCamposArrendo();

          }

        } else {
          this.show = 404;
          this.respuesta.msj = 'Ingrese otro ilmueble, este ya se encuentra arrendado';
          alert('Ingrese otro ilmueble, este ya se encuentra arrendado');
          this.limpiarCamposArrendo();
        }

      });
    });
    }


  }




  buscarCliente() {
    if (this.selectedPersona.cedula == null) {
      this.show = 404;
      this.respuesta.msj = 'Debe ingresar la cedula del cliente';

    } else {
      this.clienteService.buscarPersona(this.selectedPersona.cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente ';
          this.show = 404;
        } else {
          this.respuesta.msj = 'Despliegue los datos del cliente';
          this.show = 505;
          this.selectedPersona = JSON.parse(JSON.stringify(cliente));
          this.selectedPersona.fecha_nacimiento = this.clienteService.formatoFecha(this.selectedPersona.fecha_nacimiento);
          this.municipioService.buscarMunicipio(cliente['municipio_id'])
          .subscribe(mun => {
              this.selectedDepartamento.id = mun['departamento_id'];
              this.listarMunicipios();
              this.selectedMunicipio = mun;

            });
          this.clienteService.buscarLoginPersona(cliente.cedula)
          .subscribe(login => {
              if (login === undefined ) {
                this.respuesta.msj = 'No se encuentra ningun login con el username ' +  this.selectedPersona.cedula;
                console.log('NO SE ENCUENTRA EL LOGIN');
              } else {
              this.selectedLogin = JSON.parse(JSON.stringify(login));
              }
            });
          }
        });
    }
   }

   buscarInmueble() {

    if (this.selectedInmueble.matricula == null) {
      this.respuesta.msj = 'Debe ingresar la matrícula del inmueble';
      this.show = 1;
    } else {
      this.inmuebleService.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'No se encuentra ningun inmueble';
          this.show = 1;
           this.boolBuscarInmueble = false;
        } else {
           this.marcadorAgregado = true;
           this.mostrarTabArchivos = false;
           this.selectedInmueble = inmueble;
           this.listarArchivos();
           this.obtenerDatosCombosBusqueda();
           this.obtenerPublicacionInmueble();
           this.respuesta.msj = 'Despliegue los datos del inmueble';
           this.show = 2;
        }
      });
    }
  }

  listarArriendos() {
    this.arriendoService.listarArriendos().subscribe(arriendo => {
      this.listaArriendos = arriendo;
    });
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

  listarArchivos() {
    this.inmuebleService.listarArchivos(this.selectedInmueble.id)
    .subscribe(archivo => {
      this.archivo = archivo;
      return true;
    });
  }

   /**
   * Obtiene los datos de la cadena json retornada en la busqueda del inmueble
   * @param atributo nombre del campo en la consulta obtenida
   */
  obtenerDatosJSON(atributo: string, inmueble: Inmueble) {
    return JSON.parse(JSON.stringify(inmueble[atributo]));
  }


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
   * Obtiene la lista de tipos de inmuebles
   */
  listarTiposInmueble() {
    this.inmuebleService.listarTiposInmueble()
    .subscribe(tipoInmueble => {
      this.listaTiposInmueble = tipoInmueble;

    });
  }

  /**
   * Permite  los datos de un inmueble
   * @param inmueble inmueble del cual se desea  los datos
   */
  ver (arriendo: Arriendo) {
    this.selectedArriendo = arriendo;
    this.buscarArriendo();
     this.buscarArriendoVisitaPrueba();
    this.Arriendo = true;
    this.respuesta.msj = 'Despliegue para  los datos del arriendo';
    this.show = 505;
  }

  buscarArriendoVisitaPrueba() {

        this.arriendoService.buscarArriendoVisitaPrueba(this.selectedArriendo.id).subscribe(arriendo => {
          this.arriendoDTO = arriendo;
          if (this.selectedArriendo.visita_id !== null) {
            this.arriendoDTO.fecha = this.clienteService.formatoFecha(arriendo.fecha);
          }
        });
        this.listarArriendos();

  }


  buscarArriendo() {
    if (this.selectedArriendo.id === null) {
      this.respuesta.msj = 'Ingrese el identificador del arriendo';
      this.show = 404;
    } else {
      this.arriendoService.buscarArriendo(this.selectedArriendo.id)
      .subscribe(arriendo => {

        if (arriendo === undefined) {
          this.respuesta.msj = 'El arriendo no existe';
          this.show = 404;
        } else {

          this.selectedArriendo = arriendo;

          this.selectedArriendo.id = arriendo.id;
          this.selectedArriendo.inmueble_id = arriendo.inmueble_id.id;
          this.selectedArriendo.cliente_cedula = arriendo.cliente_cedula;
          this.selectedArriendo.empleado_cedula = arriendo.empleado_cedula;
          this.selectedArriendo.visita_id = arriendo.visita_id;
          this.selectedArriendo.activo = arriendo.activo;
        }
       });
      }
  }



  eliminar(arriendo: Arriendo) {
    this.arriendoService.eliminar(arriendo)
    .subscribe(res => {
      this.respuesta = JSON.parse(JSON.stringify(res));
      this.show = this.respuesta.id;
      this.listarArriendos();
      this.limpiarCamposArrendo();
    });
  }


  limpiarCamposArrendo() {
    this.selectedArriendo.id = null;
    this.selectedArriendo.cliente_cedula = null;
    this.selectedArriendo.empleado_cedula = null;
    this.selectedArriendo.inmueble_id = null;
    this.selectedArriendo.visita_id = null;
    this.selectedInmueble.matricula = null;
    this.selectedPersona.cedula = null;
  }


  limpiarCamposDTO () {
    this.arriendoDTO.id = null;
    this.arriendoDTO.empleado_cedula = null;
    this.arriendoDTO.cliente_cedula = null;
    this.arriendoDTO.inmueble_id = null;
    this.arriendoDTO.fecha = null;
    this.arriendoDTO.hora = null;
    this.arriendoDTO.matricula = null;

  }

editarArriendoPrueba() {
          if (this.arriendoDTO.cliente_cedula === undefined) {
            this.respuesta.msj = 'Para editar debe buscar previamente';
                confirm('Para editar debe buscar previamente');
        } else if (this.arriendoDTO.matricula === undefined) {
            this.respuesta.msj = 'Para editar debe buscar previamente';
              confirm('Para editar debe buscar previamente');
        } else {
          this.inmuebleService.buscarInmueble(this.arriendoDTO.matricula + '').subscribe(inmueble => {
            this.arriendoService.buscarInmuebleId(this.arriendoDTO.inmueble_id).subscribe(inmu => {
              if (inmueble === undefined) {
                this.respuesta.msj = 'El inmueble no existe';
                this.show = 1;
              } else {
                if (this.arriendoDTO.matricula + '' === inmu.matricula) {
                  this.arriendoService.buscarCliente(this.arriendoDTO.cliente_cedula).subscribe(cliente => {
                    if (cliente === undefined) {
                      this.respuesta.msj = 'El cliente ingresado no existe';
                      this.show = 1;
                    } else {
                        this.arriendoService.buscarVisitaPrueba(this.arriendoDTO.visita_id).subscribe(visita => {
                          if (visita === undefined) {
                            this.selectedArriendo.id = this.arriendoDTO.id;
                            this.selectedArriendo.inmueble_id = inmu.id;
                            this.selectedArriendo.cliente_cedula = cliente.cedula;
                            this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
                            this.selectedArriendo.visita_id = null;
                          } else {
                            this.selectedArriendo.id = this.arriendoDTO.id;
                            this.selectedArriendo.inmueble_id = inmu.id;
                            this.selectedArriendo.cliente_cedula = cliente.cedula;
                            this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
                            this.selectedArriendo.visita_id = visita.id;
                          }
                          console.log(this.selectedArriendo);
                          this.arriendoService.EditarArriendo(this.selectedArriendo).subscribe(arri => {
                          this.respuesta = JSON.parse(JSON.stringify(arri));
                          this.show = this.respuesta.id;
                          this.listarArriendos();
                          this.limpiarCamposDTO();
                        });
                        });
                    }
                  });
                } else {
                  this.inmuebleService.buscarInmueble(this.arriendoDTO.matricula + '').subscribe(inmueble_existe => {
                    this.arriendoService.buscarInmuebleVendido(inmueble_existe.id).subscribe(inmueble_vendi => {
                      console.log(inmueble_existe);
                      if (inmueble_vendi === undefined) {
                        this.arriendoService.buscarInmuebleArrendado(inmueble_existe.id).subscribe(inmuarrendado => {
                          console.log(inmuarrendado);
                          if (inmuarrendado === undefined) {
                              this.arriendoService.buscarCliente(this.arriendoDTO.cliente_cedula).subscribe(cliente => {
                                if (cliente === undefined) {
                                  this.respuesta.msj = 'El cliente ingresado no existe';
                                  this.show = 1;
                                } else {
                                  this.arriendoService.buscarVisitaPrueba(this.arriendoDTO.visita_id).subscribe(visita => {
                                    if (visita === undefined) {
                                      this.selectedArriendo.id = this.arriendoDTO.id;
                                      this.selectedArriendo.inmueble_id = inmueble_existe.id;
                                      this.selectedArriendo.cliente_cedula = cliente.cedula;
                                      this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
                                      this.selectedArriendo.visita_id = null;
                                    } else {
                                      this.selectedArriendo.id = this.arriendoDTO.id;
                                      this.selectedArriendo.inmueble_id = inmueble_existe.id;
                                      this.selectedArriendo.cliente_cedula = cliente.cedula;
                                      this.selectedArriendo.empleado_cedula = this.usuario.persona_cedula.cedula;
                                      this.selectedArriendo.visita_id = visita.id;
                                    }
                                    console.log(this.selectedArriendo);
                                    this.arriendoService.EditarArriendo(this.selectedArriendo).subscribe(arri => {
                                    this.respuesta = JSON.parse(JSON.stringify(arri));
                                    this.show = this.respuesta.id;
                                    this.listarArriendos();
                                    this.show = 2;
                                    confirm('Se edito correctamente el arriendo');
                                    this.limpiarCamposDTO();
                                  });
                                  });
                                }
                              });
                          } else {
                            this.show = 1;
                            this.respuesta.msj = 'El inmueble se encuenrta arrendado';
                          }
                        });
                      } else {
                        this.show = 1;
                        this.respuesta.msj = 'El inmueble se encuenrta vendido';
                      }

                    });
                  });
                }
              }
            });
          });
        }
      }
}

