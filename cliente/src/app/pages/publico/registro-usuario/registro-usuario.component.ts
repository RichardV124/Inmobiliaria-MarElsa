import { Router } from '@angular/router';
import { Rol } from './../../../modelo/rol';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { RespuestaDTO } from './../../../modelo/respuestaDTO';
import { Login } from './../../../modelo/login';
import { OnInit, Component} from '@angular/core';
import { Usuario } from './../../../modelo/usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

listaUsuarios: Usuario[];

  selectedUsuario: Usuario = new Usuario();
  selectedLogin: Login = new Login();
  selectedRol: Rol = new Rol();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }

  ngOnInit() {
  }

  registrar() {

      if (this.selectedUsuario.nombre == null || this.selectedUsuario.apellido == null
        || this.selectedUsuario.email == null) {

      } else {
        this.selectedUsuario.login = this.selectedLogin;
        this.selectedRol.id = 1;
        this.selectedUsuario.rol = this.selectedRol;
        this.usuarioService.registrarUsuario(this.selectedUsuario)
        .subscribe(customer => {
          this.respuesta = JSON.parse(JSON.stringify(customer));
          console.log(this.respuesta.msj + ' SAVE');
          console.log(this.selectedUsuario.nombre);
          this.selectedUsuario = new Usuario();
          this.selectedLogin = new Login();
        });
      }
  }

  openForEdit(usuario: Usuario) {
     this.selectedUsuario = usuario;
  }

  editar() {

    if (this.selectedUsuario.nombre == null || this.selectedUsuario.apellido == null
      || this.selectedUsuario.email == null) {

    } else {
      this.selectedUsuario.login = this.selectedLogin;
      this.selectedRol.id = 1;
      this.selectedUsuario.rol = this.selectedRol;
      this.usuarioService.editarUsuario(this.selectedUsuario)
      .subscribe(customer => {
        this.respuesta = JSON.parse(JSON.stringify(customer));
        console.log(this.respuesta.msj + ' EDIT');
        this.selectedUsuario = new Usuario();
        this.selectedLogin = new Login();
      });
    }
}

  eliminar() {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
      this.usuarioService.eliminarUsuario(this.selectedUsuario)
      .subscribe(customer => {
        this.respuesta = JSON.parse(JSON.stringify(customer));
        console.log(this.respuesta.msj + ' DELETE');
        this.selectedUsuario = new Usuario();
        this.selectedLogin = new Login();
      });
    }
  }

  buscar() {

    if (this.selectedUsuario.cedula == null) {

    } else {
      this.selectedUsuario.login = this.selectedLogin;
      this.selectedRol.id = 1;
      this.selectedUsuario.rol = this.selectedRol;
      this.usuarioService.buscarUsuario(this.selectedUsuario.cedula)
      .subscribe(customer => {
        this.selectedUsuario = JSON.parse(JSON.stringify(customer));
        console.log(JSON.parse(JSON.stringify(customer)));
        console.log(this.selectedUsuario.nombre + ' SEARCH');
      });
    }
}

  listarUsuarios() {
    this.usuarioService.listarUsuarios()
    .subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
  }

}
