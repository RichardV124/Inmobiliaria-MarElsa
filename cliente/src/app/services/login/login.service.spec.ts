import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Login } from '../../modelo/login';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { async } from 'q';
import { HttpClientModule } from '@angular/common/http';

 fdescribe('LoginService', () => {

  let dep: Departamento;
    let mun: Municipio;
    let rol: Rol;
    let per: Persona;
    let login: Login;
    let service: LoginService;

    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientModule],
    });
    service = TestBed.get(LoginService);
    dep = new Departamento();
    mun = new Municipio();
    rol = new Rol();
    per = new Persona();
    login = new Login();
  }); 


  afterEach(()=>{
    dep = null;
    mun = null;
    rol = null;
    per =null;
  })

  it('deberia retornar un usuario de la bd', async() => {
    
    dep.nombre ="Quindio";
    dep.id = 1;

    mun.nombre = "Armenia";
    mun.id = 1;
    mun.departamento_id = dep;

    rol.id = 1;
    rol.nombre = "empleado";
    rol.descripcion = "empleado";

    per.nombre = "David";
    per.apellido = "Roman";
    per.fecha_nacimiento = new Date(1998-08-21);
    per.cedula = "123";
    per.direccion= "por ahi";
    per.telefono = 2342342;
    per.correo = "david";
    per.rol_id = rol;
    per.municipio_id = mun;
    per.genero = 0;

    login.username = "david";
    login.contrasenia= "123";
    login.persona_cedula = per;

    service.login(login).subscribe(rta =>{
      expect(rta.data.username).toEqual(login.username);
    });
    
    });
});
