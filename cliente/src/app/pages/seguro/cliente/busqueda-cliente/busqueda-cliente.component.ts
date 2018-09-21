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

  constructor(private clienteService: ClienteService, private loginService: LoginService
    , private municipioService: MunicipioService, private accesoRolService: AccesoRolService) {
    this.listarDepartamentos();
    this.listarClientes();
    this.selectedDepartamento.id = 0;
    this.selectedMunicipio.id = 0;
    this.selectedPersona.genero = 0;
  }

  ngOnInit() {
  }

   buscar() {

  //   if (this.selectedCliente.cedula == null) {

  //   } else {
  //     this.clienteService.buscarPersona(this.selectedCliente.cedula)
  //     .subscribe(cliente => {
  //       if (cliente === undefined ) {
  //         this.respuesta.msj = 'No se encuentra ningun cliente con la cedula ' +  this.selectedCliente.cedula;
  //         console.log('NO SE ENCUENTRA');
  //         this.limpiarcampos();
  //       } else {
  //         this.selectedCliente = JSON.parse(JSON.stringify(cliente));
  //         let username = JSON.parse(JSON.stringify(cliente))['login_username'];
  //         console.log(username + ' CONCHETUMADRE!!! .l.');
  //         this.loginService.(username)
  //           .subscribe(login => {
  //             if (login === undefined ) {
  //               this.respuesta.msj = 'No se encuentra ningun login con el username ' +  this.selectedCliente.cedula;
  //               console.log('NO SE ENCUENTRA EL LOGIN');
  //             } else {
  //             this.selectedLogin = JSON.parse(JSON.stringify(login));
  //             console.log(this.selectedLogin.username + ' SEARCH');
  //             }
  //           });
  //         }
  //       });
  //   }
   }

  eliminar(cliente: Persona) {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.clienteService.eliminarPersona(cliente)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.selectedPersona = new Persona();
        this.selectedLogin = new Login();
        this.show = 2;
      });
    }
  }

  ver(cliente: Persona) {
    this.listarDepartamentos();
    this.selectedPersona = cliente;
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
    });
  }

  rolesMunicipios() {
    for (let persona of this.listaClientes) {
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
    });
  }

  listarMunicipios() {
    this.municipioService.listarMunicipios(this.selectedDepartamento.id).
    subscribe(municipio => {
      this.listaMunicipios = municipio;
    });
  }

  limpiarcampos() {
    this.selectedPersona.nombre = null;
    this.selectedPersona.apellido = null;
    this.selectedPersona.correo = null;
    this.selectedPersona.direccion = null;
    this.selectedPersona.telefono = null;
    this.selectedPersona.fecha_nacimiento = null;

    this.selectedLogin.username = null;
    this.selectedLogin.contrasenia = null;
  }
}
