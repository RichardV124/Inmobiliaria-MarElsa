import { MunicipioService } from './../../../../../services/municipio/municipio.service';
import { Rol } from './../../../../../modelo/rol';
import { TipoPersonal } from './../../../../../modelo/tipo_personal';
import { PersonaService } from './../../../../../services/persona/persona.service';
import { Persona } from './../../../../../modelo/persona';
import { Router } from '@angular/router';
import { RespuestaDTO } from './../../../../../modelo/respuestaDTO';
import { Login } from './../../../../../modelo/login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-personal',
  templateUrl: './gestion-personal.component.html',
  styleUrls: ['./gestion-personal.component.css']
})
export class GestionPersonalComponent implements OnInit {

  show = 0;

  listaPersonal: Persona[];
  listaTipoPersonal: TipoPersonal[];

  personaSeleccionada: Persona = new Persona();
  loginSeleccionado: Login = new Login();
  tipoPersonalSeleccionado: TipoPersonal = new TipoPersonal();
  rolSeleccionado: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private personaService: PersonaService,  private router: Router ,
    private municipioService: MunicipioService) {
    //this.listarEmpleados();
    this.listarTipoPersonal();
    this.tipoPersonalSeleccionado.id = 0;
  //  this.personaSeleccionada.tipo_id = this.tipoPersonalSeleccionado;
  }

  ngOnInit() {
  }


  ver(persona: Persona) {
    this.personaSeleccionada = persona;
    this.buscar();
  }

  buscar() {

    if (this.personaSeleccionada.cedula == null) {

      this.show = 1;
          this.respuesta.msj = 'Debe ingresar la cedula a buscar ';
    } else {
      this.personaService.buscarPersona(this.personaSeleccionada.cedula)
      .subscribe(personal => {
        if (personal === undefined ) {
          this.show = 1;
          this.respuesta.msj = 'No se encuentra ningun empleado con la cedula ' +  this.personaSeleccionada.cedula;
          console.log('NO SE ENCUENTRA');
        } else {
        this.personaSeleccionada = JSON.parse(JSON.stringify(personal));
        let tipo = JSON.parse(JSON.stringify(personal))['tipo_id'];
        let username = JSON.parse(JSON.stringify(personal))['login_username'];
        this.tipoPersonalSeleccionado.id = tipo;
        this.loginSeleccionado.username = username;
this.loginSeleccionado.persona_cedula = this.personaSeleccionada;
       //this.personaSeleccionada.tipo_id = this.tipoPersonalSeleccionada;
      //  console.log(this.selectedPersonal.tipo_id.id);
        //console.log(this.selectedPersonal.nombre + ' SEARCH');
        }
      });
    }
}


 
  registrar() {

      if (this.personaSeleccionada.nombre == null || this.personaSeleccionada.apellido == null
        || this.personaSeleccionada.fecha_nacimiento == null || this.personaSeleccionada.direccion == null
        || this.personaSeleccionada.cedula == null) {

      } else {
       // this.personaSeleccionada.tipo_id = this.selectedTipoPersonal;
        this.loginSeleccionado.persona_cedula = this.personaSeleccionada;
        //Le quemamos el rol de empleado el cual es 2
        this.rolSeleccionado.id = 2;
       this.personaSeleccionada.rol_id = this.rolSeleccionado;
        this.personaService.registrarPersona(this.personaSeleccionada)
        .subscribe(res => {
          this.respuesta = JSON.parse(JSON.stringify(res));
          console.log(this.respuesta.msj + ' SAVE');
          console.log(this.personaSeleccionada.nombre);
          this.personaSeleccionada = new Persona();
          this.loginSeleccionado = new Login();
          this.show = 2;
        });
      }
  }

  editar() {

    if (this.personaSeleccionada.nombre == null || this.personaSeleccionada.apellido == null
      || this.personaSeleccionada.fecha_nacimiento == null || this.personaSeleccionada.direccion == null
      || this.personaSeleccionada.cedula == null) {

    } else {
      //this.selectedPersonal.login = this.selectedLogin;
      //this.selectedPersonal.tipo_id = this.selectedTipoPersonal;
      //console.log(JSON.parse(JSON.stringify(this.selectedPersonal)));
      this.personaService.editarPersona(this.personaSeleccionada)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' EDIT');
        this.personaSeleccionada = new Persona();
        this.loginSeleccionado = new Login();
      });
    }
}

  eliminar(personal: Persona) {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.personaService.eliminarPersonal(personal)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.personaSeleccionada = new Persona();
        this.loginSeleccionado = new Login();
        this.show = 2;
      });
    }
  }

  listarEmpleados() {
    this.personaService.listarPersona()
    .subscribe(personal => {
      this.listaPersonal = personal;
    });
  }

  listarTipoPersonal() {
    this.personaService.listarTipoPersonal()
    .subscribe(tipoPersonal => {
      this.listaTipoPersonal = tipoPersonal;
    });
  }
}