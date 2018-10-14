import { Persona } from './../../../../modelo/persona';
import { AccesoRolService } from './../../../../services/acceso-rol/acceso-rol.service';
import { MunicipioService } from './../../../../services/municipio/municipio.service';
import { Departamento } from './../../../../modelo/departamento';
import { Municipio } from './../../../../modelo/municipio';
import { LoginService } from './../../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../../../modelo/login';
import { Rol } from '../../../../modelo/rol';
import { RespuestaDTO } from '../../../../modelo/respuestaDTO';
import { ClienteService } from '../../../../services/cliente/cliente.service';

@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.css']
})
export class BusquedaClienteComponent implements OnInit {

  selectedPersona: Persona = new Persona();
  selectedLogin: Login = new Login();
  rol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();
  listaMunicipios: Municipio[];
  listaDepartamentos: Departamento[];
  listaClientes: Persona[];
  selectedMunicipio: Municipio = new Municipio();
  selectedDepartamento: Departamento = new Departamento();
  show = 0;

  // Variables de validacion

  buscado = false;
  eliminado = false;
  listandoClientes = false;
  listandoMunicipios = false;
  listandoDepartamentos = false;

  constructor(private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService, private accesoRolService: AccesoRolService) {
    this.loginService.esAccesible('busqueda-cliente');
    this.listarDepartamentos();
    this.listarClientes();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
    this.show = 0;
  }

  ngOnInit() {
  }

  cerrarMsj() {
    this.show = 0;
  }

  validarBusqueda(): boolean {
    return this.buscado;
   }

   validarEliminar(): boolean {
    return this.eliminado;
   }

   validarListarMunicipios(): boolean {
    return this.listandoMunicipios;
   }

   validarListarDepartamentos(): boolean {
    return this.listandoDepartamentos;
   }

   validarListarClientes(): boolean {
    return this.listandoClientes;
   }

   buscar() {
    if (this.selectedPersona.cedula == null) {
      this.show = 1;
      this.respuesta.msj = 'Debe ingresar la cedula a buscar';

      this.buscado = false;

    } else {
      this.clienteService.buscarPersona(this.selectedPersona.cedula)
      .subscribe(cliente => {
        if (cliente === undefined ) {
          this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ';
          this.show = 1;
          console.log('NO SE ENCUENTRA');
          this.limpiarcampos();

          this.buscado = false;

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

              this.buscado = true;

            });
          this.clienteService.buscarLoginPersona(cliente.cedula)
          .subscribe(login => {
              if (login === undefined ) {
                this.respuesta.msj = 'No se encuentra ningun login con el username ' +  this.selectedPersona.cedula;
                console.log('NO SE ENCUENTRA EL LOGIN');
              } else {
              this.selectedLogin = JSON.parse(JSON.stringify(login));
              console.log(this.selectedLogin.username + ' SEARCH');
              }
            });
          }
        });
    }
   }

  eliminar(cliente: Persona) {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      cliente.activo = 0;
      this.clienteService.eliminarPersona(cliente)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.selectedPersona = new Persona();
        this.selectedLogin = new Login();
        this.show = 2;
        this.listarClientes();
        this.eliminado = true;
      });
    }
    this.eliminado = false;
  }

  ver(cliente: Persona) {
    this.listarDepartamentos();
    this.selectedPersona = cliente;
    this.clienteService.buscarLoginPersona(cliente.cedula)
    .subscribe(login => {
      this.selectedLogin = login;
    });
    // this.selectedLogin.username = cliente.
    // this.municipioService.buscarDepartamento(JSON.parse(JSON.stringify(cliente.municipio['departamento_id'])))
    //   .subscribe(dep => {
    //             this.selectedDepartamento = JSON.parse(JSON.stringify(dep));
    //   });
    this.selectedDepartamento.id = cliente.municipio_id['departamento_id'];
    this.listarMunicipios();
    this.selectedMunicipio.id = cliente.municipio_id.id;
    this.buscar();
  }

  listarClientes() {
    this.clienteService.listarClientes()
    .subscribe(personas => {
      this.listaClientes = personas;
      this.rolesMunicipios();

      if (this.listaClientes === undefined) {
          this.listandoClientes = false;
      } else {

        this.listandoClientes = true;

      }
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

  listarDepartamentos() {
    this.municipioService.listarDepartamentos().
    subscribe(departamento => {
      this.listaDepartamentos = departamento;

      if (this.listaDepartamentos === undefined) {
          this.listandoDepartamentos = false;
      } else {
        this.listandoDepartamentos = true;
      }
    });
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;

      if (this.listaMunicipios === undefined) {
        this.listandoMunicipios = false;
      } else {
        this.listandoMunicipios = true;
      }
    });
  }

  limpiarcampos() {
    this.selectedPersona = new Persona();
    this.selectedLogin = new Login();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
  }
}
