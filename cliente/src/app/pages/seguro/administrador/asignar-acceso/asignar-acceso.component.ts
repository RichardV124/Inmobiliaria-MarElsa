import { AccesoRol } from './../../../../modelo/acceso_rol';
import { AccesoRolService } from './../../../../services/acceso-rol/acceso-rol.service';
import { Acceso } from './../../../../modelo/acceso';
import { Rol } from './../../../../modelo/rol';
import { Component, OnInit } from '@angular/core';
import { RespuestaDTO } from '../../../../modelo/respuestaDTO';

@Component({
  selector: 'app-asignar-acceso',
  templateUrl: './asignar-acceso.component.html',
  styleUrls: ['./asignar-acceso.component.css']
})
export class AsignarAccesoComponent implements OnInit {

  listaRoles: Rol[];
  listaAccesos: Acceso[];
  listaAccesoRol: AccesoRol[];
  rolSeleccionado: Rol = new Rol();
  accesoSeleccionado: Acceso = new Acceso();
  accesoRol: AccesoRol = new AccesoRol();
  respuesta: RespuestaDTO;
  show;

  constructor(private rolService: AccesoRolService) {
    this.listarAccesos();
    this.listarRoles();
    this.rolSeleccionado.id = 0;
    this.accesoSeleccionado.id = 0;
    this.listarAccesosRol();
  }

  ngOnInit() {
  }

asignar () {
this.accesoRol.rol = this.rolSeleccionado;
this.accesoRol.acceso = this.accesoSeleccionado;

this.rolService.asignarAcceso(this.accesoRol)
        .subscribe(res => {
          this.respuesta = JSON.parse(JSON.stringify(res));
          if (this.respuesta.id == 600) {
            this.show = 1;
          } else {
              this.rolSeleccionado = new Rol();
              this.accesoSeleccionado = new Acceso();
              this.accesoRol = new AccesoRol();
          this.show = 2;
          this.listarAccesosRol();
          }
        });
}

eliminar (accesoRol: AccesoRol) {

  if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
    this.rolService.eliminarAccesoRol(accesoRol)
    .subscribe(res => {
      this.respuesta = JSON.parse(JSON.stringify(res));
      console.log(this.respuesta.msj + ' DELETE');
      this.show = 2;
      this.listarAccesosRol();
    });
  }

}

  listarRoles() {
    this.rolService.listarRoles()
    .subscribe(roles => {
      this.listaRoles = roles;
    });
  }


  listarAccesos() {
    this.rolService.listarAccesos()
    .subscribe(accesos => {
      this.listaAccesos = accesos;
    });
  }

  listarAccesosRol() {
    this.rolService.listarAccesosRol()
    .subscribe(accesosRol => {
      this.listaAccesoRol = accesosRol;
    this.rolesAcccesos();
    });
  }

  rolesAcccesos() {
    for (let accesoRol of this.listaAccesoRol) {
     this.rolService.buscarRolPorId(JSON.parse(JSON.stringify(accesoRol['rol_id'])))
      .subscribe(rol => {
        accesoRol.rol = rol;
      });

      this.rolService.buscarAccesoPorId(JSON.parse(JSON.stringify(accesoRol['acceso_id'])))
      .subscribe(acceso => {
        accesoRol.acceso = acceso;
      });

    }
}

}
