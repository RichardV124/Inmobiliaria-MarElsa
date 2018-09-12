import { RespuestaDTO } from './../../modelo/respuestaDTO';
import { UsuarioService } from './../../services/login/usuario.service';
import { Login } from './../../modelo/login';
import { OnInit, Component} from '@angular/core';
import { Usuario } from './../../modelo/usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

listaUsuarios: Usuario[];

  selectedUsuario: Usuario = new Usuario();
  selectedLogin: Login = new Login();
  respuesta: RespuestaDTO = new RespuestaDTO();

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
  }

  registrar() {

      if (this.selectedUsuario.nombre == null || this.selectedUsuario.apellido == null
        || this.selectedUsuario.email == null) {

      } else {
        this.selectedUsuario.login = this.selectedLogin;
        this.usuarioService.registrarUsuario(this.selectedUsuario)
        .subscribe(customer => {
          this.respuesta = JSON.parse(JSON.stringify(customer));
          console.log(this.respuesta.msj + ' ASDADSFFFFFFFF');
          this.selectedUsuario = new Usuario();
          this.selectedLogin = new Login();
        });
      }
  }

  openForEdit(usuario: Usuario) {
     this.selectedUsuario = usuario;
  }

  eliminar() {
    if (confirm('¿ Estas seguro que quieres eliminarlo ?')) {
     this.listaUsuarios = this.listaUsuarios.filter(x => x !== this.selectedUsuario);
     this.selectedUsuario = new Usuario();
    }
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios()
    .subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
  }

}
