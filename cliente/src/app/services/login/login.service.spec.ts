import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { Login } from '../../modelo/login';
import { Persona } from '../../modelo/persona';
import { Rol } from '../../modelo/rol';
import { Municipio } from '../../modelo/municipio';
import { Departamento } from '../../modelo/departamento';
import { async } from 'q';
import { HttpClientModule } from '@angular/common/http';

 describe('LoginService', () => {

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
});
