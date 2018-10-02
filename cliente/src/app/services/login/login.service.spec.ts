import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Login } from '../../modelo/login';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';


let dep: Departamento;
let mun: Municipio;
let rol: Rol;
let per: Persona;
let login: Login;

 describe('LoginTest', () => {

    dep = new Departamento();
    mun = new Municipio();
    rol = new Rol();
    per = new Persona();
    login = new Login();

    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    });
  }); 

  it('deberia retornar el usuario', () => {

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
    per.fecha_nacimiento = new Date("1998,08,21");
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

    const servicio: LoginService = TestBed.get(LoginService);
    servicio.login(login).subscribe(rta =>{
      console.log("userrrrrr "+rta.username);
      expect(rta.username).toEqual("david");

  });
});
});