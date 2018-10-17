import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Persona } from 'src/app/modelo/persona';
import { Login } from 'src/app/modelo/login';
import { Rol } from 'src/app/modelo/rol';
import { RespuestaDTO } from 'src/app/modelo/respuestaDTO';
import { Municipio } from 'src/app/modelo/municipio';
import { Departamento } from 'src/app/modelo/departamento';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { MunicipioService } from 'src/app/services/municipio/municipio.service';
import { AccesoRolService } from 'src/app/services/acceso-rol/acceso-rol.service';
import { Inmueble } from 'src/app/modelo/inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { TipoInmueble } from 'src/app/modelo/tipo_inmueble';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { Venta } from 'src/app/modelo/venta';

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {


  selectedPersona: Persona = new Persona();
  selectedInmueble: Inmueble = new Inmueble();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  respuesta2: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  listaClientes: Persona[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  publicarEnArriendo: boolean;
  publicarEnVenta: boolean;
  selectedFile: File[] = null;
  selectedTipoInmueble: TipoInmueble = new TipoInmueble();
  propietario: Persona = new Persona();
  selectedVenta: Venta = new Venta();
  show = 0;
  showInm = 0;


  constructor(private inmuebleServie: InmuebleService,private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService, private accesoRolService: AccesoRolService,private ventaService: VentasService) {
    this.loginService.esAccesible('busqueda-cliente');
    this.listarDepartamentos();
    this.listarClientes();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
    this.show = 0;
  }

  ngOnInit() {
    this.loginService = this.loginService.getUsuario();
  }


  buscar() {
    if (this.selectedPersona.cedula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe ingresar la cedula a buscar';

    } else {
      this.clienteService.buscarPersona(this.selectedPersona.cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ';
          this.show = 1;
          console.log('NO SE ENCUENTRA');
          this.limpiarcampos();

        } else {
          this.respuesta.msj = 'Despliegue los datos del cliente';
          this.show = 2;
          this.selectedPersona = JSON.parse(JSON.stringify(cliente));
          this.selectedPersona.fecha_nacimiento = this.clienteService.formatoFecha(this.selectedPersona.fecha_nacimiento);
          this.municipioService.buscarMunicipio(cliente['municipio_id'])
          .subscribe(mun => {
              this.selectedDepartamento.id = mun['departamento_id'];
              this.listarMunicipios();
              this.selectedMunicipio = mun;

            });
          }
        });
    }
   }

   buscarInmueble() {

    if (this.selectedInmueble.matricula == null) {
      this.respuesta.msj = 'Debe ingresar la matrícula del inmueble';
      this.show = 404;
    } else {
      this.inmuebleServie.buscarInmueble(this.selectedInmueble.matricula)
      .subscribe(inmueble => {
        if (inmueble === undefined) {
          this.respuesta.msj = 'El inmueble no existe';
          this.show = 404;
          this.limpiarCamposInmueble();
        } else {
          this.respuesta2.msj = 'Despliegue los datos del inmueble';
          this.showInm = 2;
          this.selectedInmueble = inmueble;
          this.obtenerDatosCombosBusqueda();
          this.obtenerPublicacionInmueble();
        }
      });
    }
  }
  cerrarMsj() {
    this.show = 0;
  }

  cerrarMsjInmueble() {
    this.showInm = 0;
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
   * Obtiene los datos de la cadena json retornada en la busqueda del inmueble
   * @param atributo nombre del campo en la consulta obtenida
   */
  obtenerDatosJSON(atributo: string, inmueble: Inmueble) {
    return JSON.parse(JSON.stringify(inmueble[atributo]));
  }


registrarVenta(){

this.selectedVenta.cliente_cedula = this.selectedPersona;
this.selectedVenta.empleado_cedula = this.loginService.usuario.persona_cedula;
this.selectedVenta.inmueble_id = this.selectedInmueble;
this.selectedVenta.activo = true;

//this.ventaService.buscarPorInmbuebleyCedula(this.selectedPersona.cedula, this.selectedInmueble.id);

this.ventaService.registroVenta(this.selectedVenta).subscribe(res => {
  this.respuesta = JSON.parse(JSON.stringify(res));
  console.log(this.respuesta.msj + ' SAVE');
  console.log(this.selectedPersona.nombre);
  this.selectedPersona = new Persona();
  this.selectedLogin = new Login();
});

}


  limpiarCamposInmueble() {
    this.combosPorDefecto();
    this.selectedPersona = new Persona();
    this.selectedInmueble = new Inmueble();
    this.selectedInmueble.zona = 0;
    this.publicarEnArriendo = false;
    this.publicarEnVenta = false;
    this.selectedFile = [];
  }
  combosPorDefecto() {
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedInmueble.zona = 0;
    this.selectedTipoInmueble.id = 0;
  }
  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;
    });
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }
  listarClientes() {
    this.clienteService.listarClientes()
    .subscribe(personas => {
      this.listaClientes = personas;
      this.rolesMunicipios();
    });
  }

  rolesMunicipios() {
    for (const persona of this.listaClientes) {
      this.accesoRolService.buscarRolPorId(JSON.parse(JSON.stringify(persona['rol_id'])))
      .subscribe(rol => {
                persona.rol_id = JSON.parse(JSON.stringify(rol));
      });

      this.municipioService.buscarMunicipio(JSON.parse(JSON.stringify(persona['municipio_id'])))
      .subscribe(mun => {
                persona.municipio_id = JSON.parse(JSON.stringify(mun));
      });
    }
  }

  limpiarcampos() {
    this.selectedPersona = new Persona();
    this.selectedLogin = new Login();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
  }
}
