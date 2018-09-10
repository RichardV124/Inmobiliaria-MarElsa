import { OnInit, Component} from '@angular/core';
import { Usuario } from './../../modelo/usuario';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  listaUsuarios: Usuario[] = [
    {id: 1 , nombre: 'Alfredo' , apellido: 'Martinez' , email: 'alfredo@gmail.com' },
    {id: 2 , nombre: 'Pepinos' , apellido: 'Rios' , email: 'pepinos@gmail.com'},
    {id: 3 , nombre: 'Didi' , apellido: 'Soplapollas' , email: 'didi@gmail.com'},
  ];

  selectedUsuario: Usuario = new Usuario();

  constructor() {
  }

  ngOnInit() {
  }

  agregarOEditar() {

    if (this.selectedUsuario.id === 0) {
      if (this.selectedUsuario.nombre == null || this.selectedUsuario.apellido == null
        || this.selectedUsuario.email == null) {

      } else {
     this.selectedUsuario.id = this.listaUsuarios.length + 1 ;
     this.listaUsuarios.push(this.selectedUsuario);
      }
    }

     this.selectedUsuario = new Usuario();
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

}
