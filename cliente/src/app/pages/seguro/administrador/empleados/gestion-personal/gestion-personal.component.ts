import { TipoPersonal } from './../../../../../modelo/tipo_personal';
import { PersonalService } from './../../../../../services/personal/personal.service';
import { Personal } from './../../../../../modelo/personal';
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


  listaPersonal: Personal[];
  listaTipoPersonal: TipoPersonal[];

  selectedPersonal: Personal = new Personal();
  selectedLogin: Login = new Login();
  selectedTipoPersonal: TipoPersonal = new TipoPersonal();
  // selectedRol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private personalService: PersonalService, private router: Router) {
    this.listarEmpleados();
        this.listarTipoPersonal();
        this.selectedTipoPersonal.id = 0;
        this.selectedPersonal.tipo_id = this.selectedTipoPersonal;
  }

  ngOnInit() {
  }

  registrar() {

      if (this.selectedPersonal.nombre == null || this.selectedPersonal.apellido == null
        || this.selectedPersonal.fecha_nacimiento == null || this.selectedPersonal.experiencia == null
        || this.selectedPersonal.formacion == null || this.selectedPersonal.direccion == null
        || this.selectedPersonal.cedula == null) {

      } else {
        this.selectedPersonal.login = this.selectedLogin;
        this.selectedPersonal.tipo_id = this.selectedTipoPersonal;
       // this.selectedRol.id = 1;
       // this.selectedUsuario.rol = this.selectedRol;
        this.personalService.registrarPersonal(this.selectedPersonal)
        .subscribe(res => {
          this.respuesta = JSON.parse(JSON.stringify(res));
          console.log(this.respuesta.msj + ' SAVE');
          console.log(this.selectedPersonal.nombre);
          this.selectedPersonal = new Personal();
          this.selectedLogin = new Login();
        });
      }
  }

  openForEdit(personal: Personal) {
     this.selectedPersonal = personal;
  }

  editar() {

    if (this.selectedPersonal.nombre == null || this.selectedPersonal.apellido == null
      || this.selectedPersonal.fecha_nacimiento == null || this.selectedPersonal.experiencia == null
      || this.selectedPersonal.formacion == null || this.selectedPersonal.direccion == null
      || this.selectedPersonal.cedula == null) {

    } else {
      this.selectedPersonal.login = this.selectedLogin;
      this.selectedPersonal.tipo_id = this.selectedTipoPersonal;
      console.log(JSON.parse(JSON.stringify(this.selectedPersonal)));
    //  this.selectedRol.id = 1;
     // this.selectedUsuario.rol = this.selectedRol;
      this.personalService.editarPersonal(this.selectedPersonal)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' EDIT');
        this.selectedPersonal = new Personal();
        this.selectedLogin = new Login();
      });
    }
}

  eliminar() {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.personalService.eliminarPersonal(this.selectedPersonal)
      .subscribe(res => {
        this.respuesta = JSON.parse(JSON.stringify(res));
        console.log(this.respuesta.msj + ' DELETE');
        this.selectedPersonal = new Personal();
        this.selectedLogin = new Login();
        this.show = 2;
      });
    }
  }

  buscar() {

    if (this.selectedPersonal.cedula == null) {

    } else {
      this.selectedPersonal.login = this.selectedLogin;
   //   this.selectedRol.id = 1;
    //  this.selectedUsuario.rol = this.selectedRol;
      this.personalService.buscarPersonal(this.selectedPersonal.cedula)
      .subscribe(personal => {
        if (personal === undefined ) {
          this.show = 1;
          this.respuesta.msj = 'No se encuentra ningun empleado con la cedula ' +  this.selectedPersonal.cedula;
          console.log('NO SE ENCUENTRA');
        } else {
        this.selectedPersonal = JSON.parse(JSON.stringify(personal));
        let tipo = JSON.parse(JSON.stringify(personal))['tipo_id'];
        let username = JSON.parse(JSON.stringify(personal))['login_username'];
        this.selectedTipoPersonal.id = tipo;
        this.selectedLogin.username = username;
        this.selectedPersonal.login = this.selectedLogin;
       this.selectedPersonal.tipo_id = this.selectedTipoPersonal;
        console.log(this.selectedPersonal.tipo_id.id);
        console.log(this.selectedPersonal.nombre + ' SEARCH');
        }
      });
    }
}

  listarEmpleados() {
    this.personalService.listarPersonal()
    .subscribe(personal => {
      this.listaPersonal = personal;
    });
  }

  listarTipoPersonal() {
    this.personalService.listarTipoPersonal()
    .subscribe(tipoPersonal => {
      this.listaTipoPersonal = tipoPersonal;
    });
  }

}

